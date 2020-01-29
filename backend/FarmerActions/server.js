const express = require('express')
const bodyParser = require('body-parser');
const axios = require('axios');
const cron = require("node-cron");
const { agnes } = require('ml-hclust');

const app = express()
const port = 5000

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const Farmer = require('./../mongoose');

function registerFarmer(data)
{
    const farmer = new Farmer({
        name: data[0],
        password: data[1],
        latitude:  data[2],
        longitude: data[3],
        bank_details: data[4],
        postal_addres: data[5],
        area: data[6],
        crop: data[7],
        cluster_id: data[8]
    })    
    farmer.save().then(response => {
    console.log('farmer saved!')
    mongoose.connection.close()
    }).catch( err => console.log(err))
}

registerFarmer(["shivam_pawase","coding17",19.0166,73.0966,"state bank of india, 28328392893","410206","panvel","sugarcane",123]);

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

cron.schedule("* * * * *", function() {
    console.log("---------------------");
    console.log("Running Cron Job");
});

app.get('/', (req, res) => res.send('Hello World!'))
app.post('/getnear', (req, res) => {
    const lat = req.body.latitude
    const lng = req.body.longitude
    const dst = req.body.distance
    
    
    axios.get('http://localhost:3000/farmers')
    .then((response) => {
        let answer = []
        response.data.forEach((farmer) => {
            if(getDistance(farmer.latitude, farmer.longitude, lat, lng) <= dst){
                answer.push(farmer)
            }
        })
        res.send({data: answer})
    })
    .catch((err) => console.log(err))

    Farmer.find({},function(err,farmers){
        console.log(farmers);
    });

})
// app.get('/getcluster', (_req,res) => {
//     axios.get('http://localhost:3000/farmers')
//         .then((response) => {
//             const locs = response.data.map((item) => [item.latitude, item.longitude])
//             const clusters = agnes(locs).cut(100)
//             const indices = clusters.map((c) => c.indices())
//             res.send({data: indices})
//         })
//         .catch((err) => console.log(err))
// })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))