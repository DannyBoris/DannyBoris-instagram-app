const mongoose = require('mongoose')

const connectToDB = async ()=>{
    try{
        connection = await mongoose.connect('mongodb://dannyboris1:tpifSP1062016@ds057857.mlab.com:57857/instagram-db',
        { useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
            console.log('Connected to DB!')
            mongoose.connection.db.executeDbAdminCommand({buildinfo:1, setFeatureCompatibilityVersion: "4.0"},(err,info)=>{
                console.log('Running MongoDB version: ' + info.version)
            })
        })
    }catch(e){
        console.error(`Could not connect to DB ${e}`)
     }
     return mongoose.connection
}
module.exports = connectToDB