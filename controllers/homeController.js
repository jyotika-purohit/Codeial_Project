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
            // },
            // populate:{
            //     path:'likes'
            // }
        });


        let allUsers=await User.find({});
        // let allUsers=await User.find({}).populate({
        //     path:'friends',
        //     populate:{
        //         path:'user'
        //     }
        // });

        if(req.isAuthenticated()){
            let currUser=await User.findById(req.user.id).populate({
                path:'friends',
                    populate:{
                        path:'user'
                    }
                
            });

            return res.render('home',{
                title:'Codeail | Homepage',
                posts:posts,
                allUsers:allUsers,
                currUser:currUser
            });

        }else{
            return res.render('home',{
                title:'Codeail | Homepage',
                posts:posts,
                allUsers:allUsers
            });
        }
        
        
        
        }catch(error){
            console.log("Error : ",error);
            return;
        }
}