
module.exports = app =>{
app.get('/x',(req,res)=>{
    res.json('it works')
})
//Get all users
app.get('/api/users', async (req,res)=>{
    let users = await userRoute.query()
    res.status(200).json(users) 
})

//Get user by id
app.get('/api/users/:id', async (req,res)=>{
    let { id } = req.params
    let user = await userRoute.getById(id)
    res.status(200).json(user) 
})

//Get user with images
app.get('/api/users/:id/images', async (req,res)=>{
let { id } = req.params
let user = await userRoute.getByIdWithImages(id)
// res.status(200).json(user) 
})

//Get user with follewers
app.get('/api/users/:id/followers', verifyToken, async (req,res)=>{
    let { id } = req.token.user
    let user = await userRoute.getByIdWithFollowers(id)
    // res.status(200).json(user) 
})
}

module.exports = userRoutes