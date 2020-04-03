const dbConn = require('./mongoose.connect')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('./User')



const query = async () =>{
    await dbConn()
    return User.find({},(err,res)=>res)
}

const getById = async id =>{
    await dbConn()
    return User.findById(id,(err,res)=>res)
}

const getByIdWithImages = async id =>{
    await dbConn()
    let res = await User.findById(mongoose.Types.ObjectId(id))
    User.aggregate([
        {
            $match:{
                name:'Masha'
            }
        },
    
        {$lookup:{
            from:'images',
            localField:'imgIds',
            foreignField:'_id',
            as:'Objjjj'
        }}
    ],(err,res)=>console.log(res))

}

const getByIdWithFollowers= async id =>{
    await dbConn()
    return User.aggregate([
        {$match:{_id: mongoose.Types.ObjectId(id)}},
        {$lookup:{
            from:'users',
            localField:'followers',
            foreignField:'_id',
            as:'followersObjs'
        }}
    ],(err,res)=>console.log(res))
}

const add = async newUser =>{
    await dbConn()
    
    let userToAdd = new User({...newUser})
    let {password} = userToAdd
    let hashedPassword = bcrypt.hashSync(password,10)
    newUser.password = hashedPassword
    // let x = bcrypt.compareSync(password, hashedPassword) //TODO
    try{
        let res = await userToAdd.save()
        return res

    }catch(e){
        let errorObj = e.code === 11000 ? 
        {msg:'User already exists. Please try a diffreent email/name',code:400} : 
        {msg:'Unknown error',code:500}           
        return errorObj;
    }
}

const authLogin = async user =>{
    await dbConn()
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
    query,
    getById,
    getByIdWithImages,
    getByIdWithFollowers,
    addUser:add,
    authUser:authLogin
}