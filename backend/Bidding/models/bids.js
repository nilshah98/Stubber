const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI,{
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
  },(err) => {
    if(err) console.log('err :', err);
    else console.log('Connected');
});

const bidSchema = new mongoose.Schema({
    stubble_id: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stubble",    //Need a Stubble Schema
      required: true, 
      unique: true },
    end_time: { type: Date, required: true},
    current_cost: { type: Number, required: true},
    current_bidder: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",   
      required: false, 
      default: null }  //REMEMBER TO CHANGE
})

bidSchema.plugin(uniqueValidator);

bidSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

const Bids = new mongoose.model('Bid',bidSchema)


module.exports = Bids