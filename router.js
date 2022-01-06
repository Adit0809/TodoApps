const express=require("express")

const app=express()
const router=express.Router()
const useMongo=require('./schemas/schema')


router.post('/add',(req,res)=>{
    console.log('res...add',req.body)
    let list1=req.body;
    useMongo.create(list1);
 //   res.send("post add")
})

router.post('/updatecheck',async (req,res)=>{
    console.log('res...updateckeck',req.body.title);

    let list2=req.body;
    await useMongo.updateOne(
        {title: list2.title},{$set:{checked: list2.checked}}
    )
    
    res.send("post updatecheck")
})

router.post('/update',async (req,res)=>{
    console.log('res...b/fupdate',req.body.prevtitle);

    let list2=req.body;
    await useMongo.updateOne(
        {title:list2.prevtitle},{$set:{title:list2.title}}
    )
    
    res.send("post update")
})

router.post('/delete',async (req,res)=>{
    console.log('res...delete',req.body.uid);

    let list3=req.body;
    await useMongo.deleteOne(
        {id:list3.uid}
    )
    
    res.send("post delete")
})
module.exports=router