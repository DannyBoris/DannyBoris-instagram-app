const connectMongoDB = require('../mongoose.connect')

const bcrypt = require('bcrypt')
const User = require('../models/User')


const add = async newUser =>{
    await connectMongoDB()
    
    let userToAdd = new User({...newUser})
    let {password} = userToAdd
    console.log(password)
    let hashedPassword = bcrypt.hashSync(password,10)
    userToAdd.password = hashedPassword
    // let x = bcrypt.compareSync(password, hashedPassword) //TODO
    try{
        let res = await userToAdd.save()
        return {msg:'User added!', code:201}

    }catch(e){
        let errorObj = e.code === 11000 ? 
        {msg:'User already exists. Please try a diffreent email/name',code:400} : 
        {msg:'Unknown error',code:500}  
        console.log(e)         
        return errorObj;
    }
}


const authLogin = async user =>{
    await connectMongoDB()
    let userInDB = null
    try{
        userInDB = await User.findOne({name:user.name, password: user.password})
    }catch(e){
        console.log(e)
    }finally{
        return userInDB
    }
        
}

module.exports = {
    authLogin,
    authSignUp:add

}
