//require libraries
const express  = require('express')
const cors = require('cors')
const bodyPraser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
app.use(cors());
//Use Middleware and routes 
app.use(bodyPraser.json())
app.use(cookieParser())
require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)
require('./routes/image.routes')(app)

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

