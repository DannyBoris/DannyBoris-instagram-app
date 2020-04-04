//require libraries
const express  = require('express')
const app = express()
const cors = require('cors')
const bodyPraser = require('body-parser')
const cookieParser = require('cookie-parser')

//require routes
const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/auth.routes')

//Use Middleware and routes 
app.use(cors());
app.use(bodyPraser.json())
app.use(cookieParser())
authRoutes(app)
userRoutes(app)

//Dummy route for main page of server
app.get('/',(req,res)=>{
    console.log('running')
    res.send('Welcome to the SERVER!');
})

//open port
const PORT = process.env.PORT || 3003

//Start server!
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});