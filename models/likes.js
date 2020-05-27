const mongoose=require('mongoose');
const likesSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //This defines the Object Id of the liked object
    likeable:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refPath:'onModel'
    },
    //This defines the Type of the liked object
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment']
    }
},{timestamps:true});
const Like=mongoose.model('Like',likesSchema);
module.exports=Like;