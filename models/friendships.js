const mongoose=require('mongoose');
const friendshipsSchema=new mongoose.Schema({
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
});

const Frienships=mongoose.model('Frienships',friendshipsSchema);
module.exports=Frienships;