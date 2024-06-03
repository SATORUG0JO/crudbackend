



const mongoose=require ('mongoose')
const cors=require('cors')
const express=require('express')
const app =express()
app.use(cors())
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/crud-project-2')
.then(()=>console.log('connect'))
.catch((err)=>console.log(err))

const UserSchema=mongoose.Schema({
    name:String,
    age:Number,
    course:String
})
const UserModel=mongoose.model('project-datas',UserSchema)
// {
//     const send =new UserModel({
//            name:'akash',
//           age:20,
//            course:'React JS'

//         })
//         send.save()
//         .then(()=>console.log('data inserted'))
//         .catch((err)=>console.log(err))
// }
app.get("/",(req,res)=>{
    UserModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err))

})
app.post('/add',(req,res)=>{
    UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err))
})
app.get('/get/:id',(req,res)=>{
    var id=req.params.id
    UserModel.findById({ _id : id })
    .then((user) => res.json(user))
    .catch((err) => res.json(err))
})
app.put('/update/:id',(req,res)=>{
    var id = req.params.id
    UserModel.findByIdAndUpdate({ _id: id },{
        name:req.body.name,age:req.body.age,course:req.body.course
    })
    .then(data => res.json(data))
    .catch(err => res.json(err))
})
app.delete('/delete/:id',(req,res)=>{
    var id=req.params.id
    UserModel.findByIdAndDelete({_id:id})
    .then(data => res.json(data))
    .catch(err => res.json(err))
})

app.listen(2001)