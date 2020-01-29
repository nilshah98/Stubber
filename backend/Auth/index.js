const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('./models/user')


loginRouter.post('/login', async (request, response) => {
  const body = request.body
  console.log("Here at Login");
  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.password)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.JWT_SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})


loginRouter.post('/signup', async (request, response, next) => {
  try {
    const body = request.body;

    console.log("Here at Signup",body,process.env.SALT_ROUNDS);
    let passwordHash;

    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(body.password, salt, async function(err, hash) {
        console.log("Hash: "+hash);
        passwordHash = hash;
        console.log("PasswordHash: "+passwordHash);

        const user = new User({
          username: body.username,
          password: passwordHash,
          latitude: body.latitude,
          longitude: body.longitude,
          postal_address: body.postal_address,
          area: body.area,
          crop: null,
          cluster_id: -1,
          usertype: body.usertype,
          bank_ifsc: body.bank_ifsc,
          bank_accno: body.bank_accno,
          bank_name: body.bank_name,
          razorpayLinkedAccount: body.razorpayLinkedAccount
        })

        console.log("User in schema: "+user);

        const savedUser = await user.save()
        // const savedUser =user.save()
        
        console.log("Saved User: "+savedUser)
        response.status(200).json(savedUser)
      });
    });

    // const passwordHash = await bcrypt.hash(body.password, process.env.SALT_ROUNDS)
    
    // response
    // .status(200)
    // .send({ token, username: user.username, name: user.name })
  } catch (exception) {
    next(exception)
  }
})

module.exports = loginRouter