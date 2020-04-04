
const connectMongoDB = require('../mongoose.connect')
const mongoose = require('mongoose')
const User = require('../models/User')

const query = async () =>{
    await connectMongoDB()
    return User.find({},(err,res)=>err ? err : res)
}

const getById = async id =>{
    await connectMongoDB()
    return User.findById(id,(err,res)=>err ? err : res)
}

const getByIdWithImages = async id =>{
    await connectMongoDB()
    User.aggregate([
        {
            $match:{
                _id:mongoose.Types.ObjectId(id)
            }
        },
        {
            $lookup:{
            from:'images',
            localField:'imgIds',
            foreignField:'_id',
            as:'imgObjs'
        }
    }
    ],(err,res)=>err ? err : res)

}

const getByIdWithFollowers= async id =>{
    await connectMongoDB()
    User.aggregate([
        {$match:{_id:id}}
    ],(err,res)=>console.log(res))
}



module.exports = {
    query,
    getById,
    getByIdWithImages,
    getByIdWithFollowers,
   
}