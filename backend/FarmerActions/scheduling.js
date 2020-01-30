const express = require('express');
const router = express.Router();
const Trucks = require('./models/trucks');
const mongoose = require('mongoose');

function getDistance(lat1, lon1, lat2, lon2) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344
        
        return dist;
    }
}


// define the home page route
router.post('/', function (req, res) {
    console.log("Schedule");
    let threshold = process.env.THRESHOLD_DISTANCE
    const body = req.body
    const current_lat = body.latitude
    const current_long = body.longitude
    const curr_end_time = body.end_time
    const curr_required_capacity = body.capacity
    const curr_farmer = body.farmer_id
    console.log(curr_farmer,curr_end_time);
    let current_truck_id = null
    let distance = null
    let latitude = null
    let longitude = null
    let capacity_rem = null
    let farmer = null
    let end_time = null
    Trucks.find({})
    .then(
        trucks => {
            console.log(trucks);
            trucks.forEach(
                (truck,index) => {
                    latitude = truck.latitude
                    longitude = truck.longitude
                    capacity_rem = truck.capacity_rem
                    end_time = truck.end_date.toISOString();
                    farmer = truck.farmers;
                    distance = getDistance(current_lat,current_long,latitude,longitude)
                    console.log(distance,parseInt(threshold)); 
                    if(capacity_rem>curr_required_capacity && distance < parseInt(threshold))
                    {
                        current_truck_id = truck.id
                        threshold = distance
                    }
                }
            )
            return current_truck_id
        }
    )
    .then(
        id => {
            console.log(id);
            if(id!==null) {
                let len = farmer.length
                farmer.push(curr_farmer)
                const truck = {
                    latitude: (latitude*len+current_lat)/(len+1),
                    longitude: (longitude*len+current_lat)/(len+1),
                    capacity_rem: capacity_rem-curr_required_capacity,
                    farmers: farmer
                }
                return Trucks.findByIdAndUpdate(id,truck,{ new: true })
            }
            else {
                let c_end_time = curr_end_time;
                let c_farmer = curr_farmer;
                const truck = new Trucks({
                    latitude: current_lat,
                    longitude: current_long,
                    capacity_rem: 500-curr_required_capacity,
                    end_date: c_end_time,
                    farmers: [c_farmer]
                })
                console.log(truck);
                return truck.save()
            }
        }
    )
    .then(
        updatedTruck => {
            console.log(updatedTruck);
            res.json(updatedTruck.toJSON())
        }
    )
    .catch((err) => {
        console.log(err);
    })
})

module.exports = router