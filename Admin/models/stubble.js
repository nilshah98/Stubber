const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
require("dotenv").config();

console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI,{
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
  },(err) => {
    if(err) console.log('err :', err);
    else console.log('Connected');
});

const stubbleSchema = new mongoose.Schema({
    owner_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",   
        required: true 
    },
    quality: String
})

const Stubble = mongoose.model('Stubble', stubbleSchema)

const stubble = new Stubble({
    owner_id: '5e317f22a9fcf320ec31ff4f',
    quality: 'Amaze'
})
    
stubble.save().then(response => {
    console.log('stubble saved!')
    mongoose.connection.close()
}).catch( err => console.log(err))

module.exports = Stubble