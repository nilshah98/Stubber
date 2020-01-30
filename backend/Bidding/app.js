const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Bids = require('./models/bids')
const mongoose = require('mongoose')
const cron = require('node-cron');

require("dotenv").config();

app.use(bodyParser.json())
app.use(cors())

cron.schedule("* * * * *", function() {
    console.log("---------------------");
    console.log("Running Cron Job");

    var t = new Date();
    var curr_time = t.toISOString();
    // Bids.find({}).then(results=>{
    //     var query = {};
        //results.filter(result => {result.end_time < curr_time}).map(
        //    Bids.deleteMany()
        //)
    //     Bids.deleteMany()
    // })

    Bids.deleteMany({'end_time' : {$lt : curr_time }}).then((res)=>{console.log("Deleted")});
});

app.get('/bids/all',(request,response)=>{
    Bids.find({}).then(result=>{
        response.json(result.map(bids => bids.toJSON()))
    })
})


app.get('/bids/:id',(request,response)=>{
    const id = mongoose.Types.ObjectId(request.params.id) 
    console.log(id)
    Bids.find({_id:id}).then(result=>{
        if(result)
        response.json(result[0])
        else
        response.status(404).end()
    })
})

app.delete('/bids/:id',(request,response)=>{
    Bids.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/bids/addBid',(request,response,next)=>{
    console.log("Posssttteeedd")
    body = request.body;
    
    if (!body.stubble_id) {
        return response.status(400).json({ 
          error: 'stubble id missing' 
        })
    }

    if (!body.end_time) {
        return response.status(400).json({ 
          error: 'end time missing' 
        })
    }
    
    if (!body.min_cost) {
        return response.status(400).json({ 
          error: 'min_cost missing' 
        })
    }

    const bid = new Bids({
        stubble_id: body.stubble_id,
        end_time: body.end_time,
        current_cost: body.min_cost
    })

    bid.save()
    .then(result=>result.toJSON())
    .then(result=>{response.json(result)})
    .catch(error => next(error))
})

app.put('/bids/:id', (request, response, next) => {
    const body = request.body
  
    const bid = {
      current_cost: body.current_cost,
      current_bidder: body.current_bidder
    }
  
    Bids.findByIdAndUpdate(request.params.id, bid , { new: true })
      .then(updatedContact => {
        response.json(updatedContact.toJSON())
      })
      .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
    else if (error.name === 'ValidationError') {
        console.log("validation error response");
        return response.status(400).json({ error: error.message })
    }
  
    next(error)
}

app.use(errorHandler);

const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`)
})