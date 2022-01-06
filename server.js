const express=require('express')
const app=express()
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
const mongoose=require('mongoose');
const useMongo=require('./schemas/schema')
const router =require('./router')


app.get("/todo1",async (req,res)=>{
    console.log('response first get',req.body);
    
   let d=await useMongo.find({});
    res.send(d)
});

app.use('/todo',router)


mongoose.connect('mongodb://localhost:27017/todo1',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
app.listen(8888,()=>{
    console.log("server is running at 8888")
})