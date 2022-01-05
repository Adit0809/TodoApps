const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    checked:{type:Boolean},
    id:{type:String},
    title:{type:String}
},{versionkey:false});
module.exports=mongoose.model('details',userSchema);




