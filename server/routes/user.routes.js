
const middleWare = require('../middleware/jwtVerifyMw')
const userQuery = require('../queries/user.queries')
module.exports = app =>{
app.get('/x',(req,res)=>{
    res.json('it works')
})
//Get all users
app.get('/api/users', async (req,res)=>{
    let users = await userQuery.query()
    res.status(200).json(users) 
})

//Get user by id
app.get('/api/users/:id', async (req,res)=>{
    let { id } = req.params
    let user = await userQuery.getById(id)
    res.status(200).json(user) 
})

//Get user with images
app.get('/api/users/:id/images', async (req,res)=>{
let { id } = req.params
let user = await userQuery.getByIdWithImages(id)
// res.status(200).json(user) 
})

//Get user with follewers
app.get('/api/users/:id/followers', middleWare.verifyToken , async (req,res)=>{
    let { id } = req.token.user
    let user = await userQuery.getByIdWithFollowers(id)
    // res.status(200).json(user) 
})
}
