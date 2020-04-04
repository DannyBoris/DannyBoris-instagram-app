const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
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