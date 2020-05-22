const User=require('../models/user');

module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('signup',{
        title:'Codeial | Signup'
    });
}

module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('signin',{
        title:'Codeial | Signin'
    });
}

module.exports.create=async function(req,res){
    if(req.body.password == req.body.confirmpassword){
        try{
            //check if user with same email id already exists
            let user=await User.findOne({email:req.body.email});
            if(!user){
                user=await User.create(req.body);
                console.log("User Created!")
                return res.redirect('/');
                
            }else{
                console.log("User with this email already exists");
                return res.redirect('back');
            }
        }catch(error){
            console.log('error');
            return res.redirect('back');

        }
    }else{
        console.log("Password and confirm password do not match");
        return res.redirect('back');
    }
    
}

module.exports.create_session=function(req,res){
    console.log("Session created!");
    return res.redirect('/');
}

module.exports.destroy_session=function(req,res){
    req.logout();
    console.log("User logged out!");
    return res.redirect('/');
}