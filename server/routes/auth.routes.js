
const jwt = require('jsonwebtoken')
const authQuery = require('../queries/auth.queries')


//Verify JWT token middleware
const verifyToken = (req,res,next)=>{
    let tokenBreaer = req.headers['authorization']
    let encodedToken = tokenBreaer.split(' ')[1]
    if(encodedToken !== 'undefined'){
        jwt.verify(encodedToken,'SecretK',(err,decodedToken)=>{
           if(err){
                res.status(403).send('Access Forbidden');
           }else{
                req.token = decodedToken
           }         
        })
    }else{
        console.log('Not authorized to enter    ')
    }
    next()
}

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

