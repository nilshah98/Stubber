const mongoose=require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const Truck = new mongoose.Schema({
    number_plate: String,
    latitude: Number,
    longitude: Number,
    capacity_rem: Number,
    end_date: Date,
    farmers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}).plugin(uniqueValidator)
    .set("toJSON", {
        transform: (doc, returnedDocument) => {
            returnedDocument.id = returnedDocument._id.toString();
            delete returnedDocument._id;
            delete returnedDocument.__v;
        }
    });

module.exports=mongoose.model("Truck",Truck);