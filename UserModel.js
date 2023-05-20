const mongoose =require('mongoose');
const Schema=mongoose.Schema;
const userSchema=new Schema({
nom:String,
prenom:String,
age:String,
email:String

},
{
    timestamps:true
})

module.exports = mongoose.model('users',userSchema)