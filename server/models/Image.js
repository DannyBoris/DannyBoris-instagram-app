const mongoose = require('mongoose')

const ImageSchema = mongoose.Schema({
    _id:{
        type:mongoose.SchemaTypes.ObjectId
    },
    title:{
        type: String,
        required: true,
    },
    url:{
    type: String,
    required: true,
    unique:true
    },
    user:{
        type:String,
    }
})

module.exports = mongoose.model('Image', ImageSchema)