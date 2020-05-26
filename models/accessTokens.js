const mongoose=require('mongoose');
const accessTokenSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    accessToken:{
        type:String,
        unique:true,
        required:true
    }
},{
    timestamps:true
});

const accessTokens=mongoose.model('accessTokens',accessTokenSchema);
module.exports=accessTokens;