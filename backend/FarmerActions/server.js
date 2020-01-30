require("dotenv").config();
const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');
const cron = require("node-cron");
const {
    agnes
} = require('ml-hclust');
const User = require('./models/user');
var scheduling = require('./scheduling');



const app = express()
// const port = 5000

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies

console.log(process.env.PORT);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err) => {
    if (err) console.log('err :', err);
    else console.log('Connected');
});

function getDistance(lat1, lon1, lat2, lon2) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    } else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;

        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }

        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344

        return dist;
    }
}

// cron.schedule("* * * * *", function() {
//     console.log("---------------------");
//     console.log("Running Cron Job");
// });

app.get('/api/', (req, res) => res.send('Hello World!'))

app.post('/api/getnear', async (req, res) => {
    try {
        const lat = req.body.latitude
        const lng = req.body.longitude
        const dst = req.body.distance
        console.log("LAT:" + lat);

        // axios.get('http://localhost:3000/farmers')
        // .then((response) => {
        //     let answer = []
        //     response.data.forEach((farmer) => {
        //         if(getDistance(farmer.latitude, farmer.longitude, lat, lng) <= dst){
        //             answer.push(farmer)
        //         }
        //     })
        //     res.send({data: answer})
        // })
        // .catch((err) => console.log(err))
        console.log("Before");

        User.find({
                usertype: "farmer"
            })
            .then((currUsers) => {
                //console.log("Users:",currUsers)
                let farmers = [];
                currUsers.forEach(element => {
                    let dist = getDistance(lat, lng, element.latitude, element.longitude);
                    console.log(dist);
                    if (dist <= dst) {
                        farmers.push(element);
                    }
                    //console.log(element);
                });
                console.log("After");
                console.log(farmers);
                phoneno = "";
                emails = "";
                message = "The nearby farmer has started harvesting!!!";
                for (let i = 0; i < farmers.length - 1; i++) {
                    phoneno += farmers[i].phone + ",";
                }
                phoneno += farmers[farmers.length - 1].phone;
                console.log(phoneno);
                for (let i = 0; i < farmers.length - 1; i++) {
                    emails += farmers[i].email + ";";
                }
                emails += farmers[farmers.length - 1].email;
                console.log(emails);
                // send mail, msg 
                // phoneno - phone nos string, emails - emails string, message - message
            })
    } catch (exception) {
        console.error(exception);
    }
})

app.get('/api/getschedule/:id', async (req, res) => {
    var user_id = req.params.id;
    Schedule.findOne({
            farmer_id: user_id
        })
        .then(result => {
            res.json(result.toJSON())
        })
        .catch(err => {
            console.log(err)
        })
})

app.post('/api/addschedule/:id', async (req, res) => {
    var user_id = req.params.id;
    var event_date = req.body.date;

    Schedule.findOne({
            farmer_id: user_id
        })
        .then(result => {
            res.json(result.toJSON())
        })
        .catch(err => {
            console.log(err)
        })
})

app.use('/api/schedule', scheduling);
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

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))