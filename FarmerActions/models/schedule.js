const mongoose=require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const scheduleSchema = new mongoose.Schema({
    farmer_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
    },
    events: [{
        description: String,
        event_date: Date 
    }]
}).plugin(uniqueValidator)
    .set("toJSON", {
        transform: (doc, returnedDocument) => {
            returnedDocument.id = returnedDocument._id.toString();
            delete returnedDocument._id;
            delete returnedDocument.__v;
        }
    });

module.exports=mongoose.model("Schedule",scheduleSchema);