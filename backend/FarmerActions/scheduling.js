const express = require('express');
const router = express.Router();
const Trucks = require('./models/trucks');

// define the home page route
router.post('/', function (req, res) {
    let threshold = process.env.THRESHOLD_DISTANCE
    const body = req.body
    const current_lat = body.latitude
    const current_long = body.longitude
    const curr_end_time = body.end_time
    const curr_required_capacity = body.capacity
    const curr_farmer = body.farmer_id
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
            trucks.forEach(
                (truck,index) => {
                    latitude = truck.latitude
                    longitude = truck.longitude
                    capacity_rem = truck.capacity_rem
                    end_time = truck.end_time
                    farmer = truck.farmer
                    distance = getDistance(current_lat,current_long,latitude,longitude) 
                    if(capacity_rem>curr_required_capacity && distance < threshold)
                    {
                        current_truck_index = truck.id
                        threshold = distance
                    }
                }
            )
            return current_truck_id
        }
    )
    .then(
        id => {
            if(id===null) {
                let len = farmer.length
                const truck = {
                    latitude: (latitude*len+current_lat)/(len+1),
                    longitude: (longitude*len+current_lat)/(len+1),
                    capacity_rem: capacity_rem-curr_required_capacity,
                    end_time: min(end_time,curr_end_time),
                    farmer: farmer.append(curr_farmer)
                }
                return Trucks.findByIdAndUpdate(id,truck,{ new: true })
            }
            else {
                const truck = new Trucks({
                    latitude: current_lat,
                    longitude: current_long,
                    capacity_rem: 500,
                    end_time: curr_end_time,
                    farmer: [curr_farmer]
                })
                return trucks.save()
            }
        }
    )
    .then(
        updatedTruck => {
            response.json(updatedTruck.toJSON())
        }
    )
})

module.exports = router