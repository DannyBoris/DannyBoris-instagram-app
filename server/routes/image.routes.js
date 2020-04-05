const ImageQuery = require ('../queries/image.query')

module.exports = app =>{
    app.get('/api/images', async (req,res)=>{
        let users = await ImageQuery.query()
        res.status(200).json(users) 
    })

    app.get('/api/images/url', async (req,res)=>{
        let users = await ImageQuery.queryHomeUrls()
        res.status(200).json(users) 
    })
    
}