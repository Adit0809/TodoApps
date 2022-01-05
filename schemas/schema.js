const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    id:{type:String},
    title:{type:String}
},{versionkey:false});
module.exports=mongoose.model('details',userSchema);




