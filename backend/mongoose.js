const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:fullstack@digitalipcv1-5ahez.mongodb.net/stubber?retryWrites=true&w=majority`

console.log(url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

// Farmer 
const farmerSchema = new mongoose.Schema({
  name: String,
  password: String,
  longitude: Number,
  latitude: Number,
  bank_details: String,
  postal_addres: String,
  area: String,
  crop: String,
  cluster_id: Number
})

const Farmer = mongoose.model('Farmer', farmerSchema)

module.exports = Farmer;

//   mongoose.connection.close()
// }).catch( err => console.log(err))// const farmer = new Farmer({
//     name: "shivam_pawase",
//     password: "coding17",
//     latitude:  19.0166,
//     longitude: 73.0966,
//     bank_details: "state bank of india, 28328392893",
//     postal_addres: "410206",
//     area: "panvel",
//     crop: "sugarcane",
//     cluster_id: 123
// })

// farmer.save().then(response => {
//   console.log('farmer saved!')

// Consumer 
const consumerSchema = new mongoose.Schema({
    name: String,
    password: String,
    longitude: Number,
    latitude: Number,
    bank_details: String,
    postal_addres: String,
})
  
const Consumer = mongoose.model('Consumer', consumerSchema)
  
// const consumer = new Consumer({
//     name: "neel_shah",
//     password: "coding17",
//     latitude:  19.0166,
//     longitude: 73.0966,
//     bank_details: "state bank of india, 28328392893",
//     postal_addres: "410206"
// })

// consumer.save().then(response => {
//   console.log('farmer saved!')
//   mongoose.connection.close()
// }).catch( err => console.log(err))

// Cluster 
const clusterSchema = new mongoose.Schema({
  keys: [Number],
  warehouse_id: Number,
  driver_id: Number
})

const Cluster = mongoose.model('Cluster', clusterSchema)

// const cluster = new Cluster({
//     keys: [1,2,3,4],
//     warehouse_id: 3282,
//     driver_id: 30290
// })

// cluster.save().then(response => {
//   console.log('cluster saved!')
//   mongoose.connection.close()
// }).catch( err => console.log(err))

// Driver 
const driverSchema = new mongoose.Schema({
    name: String,
    password: String,
    longitude: Number,
    latitude: Number,
    bank_details: String,
    postal_addres: String,
})
  
const Driver = mongoose.model('Driver', driverSchema)
  
// const driver = new Driver({
//     name: "dhruvil_shah",
//     password: "coding17",
//     latitude:  19.0166,
//     longitude: 73.0966,
//     bank_details: "state bank of india, 28328392893",
//     postal_addres: "410206"
// })

// driver.save().then(response => {
//   console.log('driver saved!')
//   mongoose.connection.close()
// }).catch( err => console.log(err))

// Warehouse 
const warehouseSchema = new mongoose.Schema({
  capacity: Number,
  admin_id: Number,
  quantity: Number
})

const Warehouse = mongoose.model('Warehouse', warehouseSchema)

// const warehouse = new Warehouse({
//     capacity: 832992,
//     admin_id: 21210,
//     quantity: 291212
// })

// warehouse.save().then(response => {
//   console.log('warehouse saved!')
//   mongoose.connection.close()
// }).catch( err => console.log(err))

// Stubble
const stubbleSchema = new mongoose.Schema({
    crop_type: String,
    quantity: Number,
    status: String,
    day_harvested: Date,
    day_collected: Date
})

const Stubble = mongoose.model('Stubble', stubbleSchema)

// const stubble = new Stubble({
//     crop_type: "rice",
//     quantity: 2129,
//     status: "about to be collected",
//     day_harvested: new Date(2020,01,15,10,30,45,90),
//     day_collected: Date.now()
// })

// stubble.save().then(response => {
//   console.log('stubble saved!')
//   mongoose.connection.close()
// }).catch( err => console.log(err))


