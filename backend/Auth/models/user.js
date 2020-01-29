 
var mongoose=require('mongoose');

var userSchema = new mongoose.Schema({
    username:String,
    password: String
});

// userSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//       returnedObject.id = returnedObject._id.toString()
//       delete returnedObject._id
//       delete returnedObject.__v
//       // the passwordHash should not be revealed
//       delete returnedObject.password
//     }
//   })

module.exports=mongoose.model("User", userSchema);