const jwt = require('jsonwebtoken')

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

module.exports={
    verifyToken
}