const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    profileImg:{
        type:String, //url,
        trim:true,
        default:'https://res.cloudinary.com/dppogsm2u/image/upload/v1586354844/default_gywvgr.jpg'
    },
    name:{
        type: String,
        required: true,
        trim:true,
        unique:true
    },
    email:{
    type: String,
    required: true,
    trim:true,
    unique:true
    },
    password:{
        type:String,
        required:true,
    },
    following:{
        type:[mongoose.SchemaTypes.ObjectId],
        default:[],


    },
    followers:{
        type:[mongoose.SchemaTypes.ObjectId],
        default:[],


        
    },
    imgIds:{
        type:[mongoose.SchemaTypes.ObjectId],
        default:[],


    }
})

module.exports = mongoose.model('User', userSchema)