const nodeMailer=require('../config/nodemailer');

//this is another way of exporting a method
exports.newRequest=(to,from,email) => {
    // console.log("Inside new Comment mailer",post);
    
    let htmlString=nodeMailer.renderTemplate({to:to,from:from},'/friendships/friendRequest.ejs'); //extnsn '.ejs' also
    
    nodeMailer.transporter.sendMail({
        from:'codeial0205@gmail.com',
        to:email,
        subject:"New Friend Request!",
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

