const Post=require('../models/post');

module.exports.homepage=async function(req,res){
    try{    
        
    let posts=await Post.find({}).
    populate('user').
    sort('-createdAt');
    
    return res.render('home',{
        title:'Codeail | Homepage',
        posts:posts
    });
    
    }catch(error){
        console.log("Error : ",error);
        return;
    }
}