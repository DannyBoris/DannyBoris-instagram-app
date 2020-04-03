const express  = require('express')
const bodyPraser = require('body-parser')
const userRoute = require('./user.route')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const app = express()
const User = require('./User.js')
const PORT = process.env.PORT || 3003
app.use(cors());
app.use(bodyPraser.json())
app.get('/',(req,res)=>{
    console.log('running')
    res.send('Welcome to the SERVER!');
})

app.get('/api/users', async (req,res)=>{
    let users = await userRoute.query()
    console.log(users)
    res.status(200).json(users) 
})

app.get('/api/users/:id', async (req,res)=>{
    let { id } = req.params
    console.log(id)
    let user = await userRoute.getById(id)
    res.status(200).json(user) 
})
app.post('/api/signup', async (req,res)=>{
    let data = await userRoute.addUser(req.body)
    res.json(data)
}) 

app.post('/api/login', async (req, res) => {
    let loginUser = await userRoute.authUser(req.body)
   if(loginUser) jwt.sign({user:{id:loginUser._id}},'SecretK',(err,token)=>{
        res.json(token)
    })
    else
    res.json({msg:'Wrong name or password please try again', code:404})
});

app.get('/api/users/:id/images', async (req,res)=>{
let { id } = req.params
let user = await userRoute.getByIdWithImages(id)
// res.status(200).json(user) 
})

app.get('/api/users/:id/followers', async (req,res)=>{
    let { id } = req.params
    let user = await userRoute.getByIdWithFollowers(id)
    // res.status(200).json(user) 
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});