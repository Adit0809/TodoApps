const express=require('express')
const app=express()
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
const mongoose=require('mongoose');
const useMongo=require('./schemas/schema')

// const cors=require('cors')
// app.use(cors())



app.get("/todo1",async (req,res)=>{
    console.log('response first get',req.body);
    
   let d=await useMongo.find({});
    res.send(d)
});

app.post('/todo/add',(req,res)=>{
    console.log('res...add',req.body)
    let list1=req.body;
    useMongo.create(list1);
    res.send("post add")
})


app.post('/todo/update',async (req,res)=>{
    console.log('res...b/fupdate',req.body.prevtitle);

    let list2=req.body;
    await useMongo.updateOne(
        {title:list2.prevtitle},{$set:{title:list2.title}}
    )
    
    res.send("post update")
})

app.post('/todo/delete',async (req,res)=>{
    console.log('res...delete',req.body.uid);

    let list3=req.body;
    await useMongo.deleteOne(
        {id:list3.uid}
    )
    
    res.send("post delete")
})

mongoose.connect('mongodb://localhost:27017/todo1',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
app.listen(8888,()=>{
    console.log("server is running at 8888")
})