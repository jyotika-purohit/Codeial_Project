const nodeMailer=require('../config/nodemailer');

//this is another way of exporting a method
exports.newComment=(post,comment) => {
    // console.log("Inside new Comment mailer",post);
    
    let htmlString=nodeMailer.renderTemplate({post:post,comment:comment},'/comments/newComment.ejs'); //extnsn '.ejs' also
    
    nodeMailer.transporter.sendMail({
        from:'codeial0205@gmail.com',
        to:post.user.email,
        subject:"New Comment Published!",
        // html:"<h1>Yay! Your comment is now published!</h1>"
        html:htmlString
    },(err,info) => {
        if(err){
            console.log("Error: ",err);
            return;
        }

        // console.log("Message sent!",info);
        return;
    });
}

