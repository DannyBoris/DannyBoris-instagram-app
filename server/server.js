//require libraries
const express  = require('express')
const cors = require('cors')
const bodyPraser = require('body-parser')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/auth.routes')
const app = express()

//Use Middleware and routes 
app.use(cors());
app.use(bodyPraser.json())
app.use(cookieParser())
app.use('/api/users',authRoutes(app))

//require routes


authRoutes(app)
userRoutes(app)

//Dummy route for main page of server
app.get('/',(req,res)=>{
    res.send('Welcome to the SERVER!');
})

//open port
const PORT = process.env.PORT || 3003

//Start server!
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

