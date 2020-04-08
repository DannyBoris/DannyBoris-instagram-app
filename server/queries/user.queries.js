
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

const getByIdWithFollowing= async id =>{ // TODO: undetstand this  query better!
    await connectMongoDB()
    return await  User.aggregate([
        {
            "$match":{
                _id:mongoose.Types.ObjectId(id)

            },
        },
        { "$lookup": {
          "from": 'users',
          "let": { "following": "$following" },
          "pipeline": [
             { "$match": { "$expr": { "$in": [ "$_id", "$$following" ] } } },
             { "$lookup": {
               "from": 'images',
               "let": { "imgIds": "$imgIds" },
               "pipeline": [
                 { "$match": { "$expr": { "$in": [ "$_id", "$$imgIds" ] } } }
               ],
               "as": "imgObjs"
             }}
           ],
           "as": "followerObjs"
        }},{
            $project:{
               followerObjs:1,
               _id:0
            }
        }
       ],(err,res)=>console.log(res))
}



module.exports = {
    query,
    getById,
    getByIdWithImages,
    getByIdWithFollowing,
   
}