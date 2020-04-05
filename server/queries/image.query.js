const Image = require('../models/Image')
const connectMongoDB = require('../mongoose.connect')


const query = async () =>{
    await connectMongoDB()
    return Image.find({},(err,res)=>err ? err : res)
}

const queryHomeUrls = async ()=>{
    await connectMongoDB()
    return Image.aggregate([
        {
            $project:{url:1},
            
        },
        {
            $limit:9
        }
    ],(err,res)=>err ? err : res)
}



module.exports ={ 
    query,
    queryHomeUrls

}
