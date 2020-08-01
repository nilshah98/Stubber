
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const headers = {
  "authorization": "q6fAdIhu1L8EzCoRs2ywjKFB34cMTZntlmVJY5D9PxXUvSQNkiSl3GdnCsjZDocfuW0VN5aiKq64J97E",
  "Content-Type": "application/x-www-form-urlencoded",
  "Cache-Control": "no-cache",
};

app.post('/sms', (req, res) => {
  console.log("sender: ",req.body.sender);
  console.log("content: ",req.body.content)
  handle_request(req.body.sender, req.body.content)
});

const handle_request = (sender,content) => {
  request = parse_content(content)
  number = parse_sender(sender)
  if(request[0]=="start harvesting") {
    start_harvest(number,request)
  }
  else if(request[0]=="check schedule") {
    check_schedule(number,request)
  }
  else if(request[0]=="help") {
    send_reply(number,"\nYou can try accessing \n1)start harvesting <amount of stubble>\n2)check schedule")
  }
  else {
    send_reply(number,"\nWe didn't get your request") 
    console.log("didn't get the request")
  }
}

const start_harvest = (number,request) => {
  console.log("start harvesting")
  send_reply(number,"\nYour request for harvesting has been processed")
}

const check_schedule = (number,request) => {
  console.log("checking schedule")
  send_reply(number,"\nYour request for checking schedule has been processed")
}

const send_reply = (number,text) => {
  const payload = `sender_id=FSTSMS&message=Hi Stubbers,${text}&language=english&route=p&numbers=${number}`;
  axios.post("https://www.fast2sms.com/dev/bulk", payload, {
                        headers
                    })
                    .then(result => {
                        console.log(result.data)
                    })
                    .catch(error => {
                        console.log(error)
                    });
}

const parse_sender = (sender) => {
  console.log("number parsed:",sender.slice(2))
  return sender.slice(2)
}

const parse_content = (content) => {
  content = content.split("\n")
  content = content.slice(1)
  console.log(content,"has been parsed")
  return content
}

app.listen(1337, (err)=>{
  if(err)
    console.log('error occured');
  else
    console.log('express is listening');  
})