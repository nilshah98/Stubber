const router = require('express').Router()
const Stubble = require('./models/stubble')
const utils = require('./utils')


router.post('/add', async (req, res) => {
  const {stubbleType, number, weight} = req.body
  const stubble = await UserModel.findOne(stubbleType)
  if(stubble){
    stubble.farmer.push({number,weight})
    const result = await Stubble.findOneAndUpdate(stubbleType,stubble)
    res.json(result)
  }
  else {
    const new_stubble = new Stubble({stubbleType,farmer:[{number,weight}]})
    await new_stubble.save()
    res.json(result)
  }
})

router.post('/calculate', async(req,res)=>{
  const {total_cost, convinience_charge, stubbleType} = req.body;
  const stubble = await UserModel.findOne(stubbleType)
  const shares = utils.calculate_share(total_cost,convinience_charge,stubble.farmer)
  utils.send_sms(shares)
  res.send("success")
})
module.exports = router
