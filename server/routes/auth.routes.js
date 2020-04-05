
const jwt = require('jsonwebtoken')
const authQuery = require('../queries/auth.queries')


//Verify JWT token middleware


module.exports  =  app =>{
    app.post('/api/signup', async (req,res)=>{
        let data = await authQuery.authSignUp(req.body)
        res.json(data)
    }) 
    
    app.post('/api/login', async (req, res) => {
        let loginUser = null
        try{
            loginUser = await authQuery.authLogin(req.body)
            loginUser ? 
            jwt.sign({user:{name:loginUser.name, id:loginUser._id.toString()}},'SecretK',(err,token)=>res.status(200).json(err ? err : token)) :
            res.json({msg:'Wrong name or password please try again' })
        }catch(e){
            res.status(500).send('Internal server error occured' ,e)
        }
    });
 }

