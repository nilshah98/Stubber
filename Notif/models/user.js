const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const User = new mongoose.Schema({
        email: String,
        phone: Number
    }).plugin(uniqueValidator)
    .set("toJSON", {
        transform: (doc, returnedDocument) => {
            returnedDocument.id = returnedDocument._id.toString();
            delete returnedDocument._id;
            delete returnedDocument.__v;
            delete returnedDocument.password;
        }
    });

module.exports = mongoose.model("User", User);