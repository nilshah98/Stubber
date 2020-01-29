const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const app = require('express')();
const User = require('./models/user');
require("dotenv").config();
// const app = express()

mongoose.connect(process.env.MONGODB_URI,{
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
},(err) => {
	if(err) console.log('err :', err);
	else console.log('Connected');
});

app.post("/notif/:id", (req, res) => {
    userid=req.params.id;
    User.findById(req.params.id,function(err,user){
        if(err){
            console.log(err);
        }else{
            email=user.email;
            name=user.name;
            phone=user.phone;
            sendMail(email,"SUBJECT");
            console.log("After sendMail")
        }
    });
})

let sendMail = function(to,subject,next){
    let senderName = 'Stubber Support<cleanngreen111@gmail.com>';
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            // host: 'smtp.gmail.com',
            // port: 465,
            // secure: true,
            auth: {
                user: 'cleanngreen111@gmail.com',
                pass: 'CleanNgreen1!',
            }
        }),mailOptions = {
            from : "Stubber Support<cleanngreen111@gmail.com>",   //Edit this to match OAuth2
            subject
        };
        
        (to)?mailOptions['to'] = to:to = '';
        // (cc)?mailOptions['cc'] = cc:cc = '';
        // (bcc)?mailOptions['bcc'] = bcc:bcc = '';

        transporter.sendMail(mailOptions,function(error,info){
            // console.log(transporter,mailOptions);e
            console.log("Mail sent")
            next(error,info);
        });
        
        transporter.close();
}

// sendMail("Ruchi Thosar<chirag.shetty@somaiya.edu>;Chirag Shetty<ruchi.thosar@somaiya.edu>","dhruvil.s@somaiya.edu",undefined,"Test mail",console.log);
app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))