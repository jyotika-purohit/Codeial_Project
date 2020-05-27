const Post=require('../models/post');
const User=require('../models/user');
module.exports.homepage=async function(req,res){
    try{    
        
    let posts=await Post.find({}).
    sort('-createdAt').
    populate('likes').
    populate('user').
    populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });

    let allUsers=await User.find({});
    
    return res.render('home',{
        title:'Codeail | Homepage',
        posts:posts,
        allUsers:allUsers
    });
    
    }catch(error){
        console.log("Error : ",error);
        return;
    }
}