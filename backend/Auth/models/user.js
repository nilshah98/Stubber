const mongoose=require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: String,
    password: String,
    email: String,
    phone: String,
    latitude: Number,
    longitude: Number,
    postal_address: String,
    area: Number,
    crop: String,
    cluster_id: Number,
    usertype: String,
    bank_ifsc: {
        type: String,
    },
    bank_accno: {
        type: String,
        unique: true
    },
    bank_name: String,
    razorpayLinkedAccount: String
}).plugin(uniqueValidator)
    .set("toJSON", {
        transform: (doc, returnedDocument) => {
            returnedDocument.id = returnedDocument._id.toString();
            delete returnedDocument._id;
            delete returnedDocument.__v;
            delete returnedDocument.password;
        }
    });

module.exports=mongoose.model("User", User);