
const jwt = require('jsonwebtoken')
const authQuery = require('../queries/auth.queries')


//Verify JWT token middleware


module.exports  =  app =>{
    console.log('routessss')
    app.post('/api/signup', async (req,res)=>{
        let data = await authQuery.authSignUp(req.body)
        res.json(data)
    }) 
    
    app.post('/api/login', async (req, res) => {
        let loginUser = await authQuery.authLogin(req.body)
       (loginUser) ?   //Send to client to store in local storage to later send for varification at the server!!
       jwt.sign({user:{id:loginUser._id}},'SecretK',(err,token)=>res.json(token)) :
        res.json({msg:'Wrong name or password please try again', code:404})
    });
 }

