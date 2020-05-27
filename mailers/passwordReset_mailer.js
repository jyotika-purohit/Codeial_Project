const nodeMailer=require('../config/nodemailer');

//this is another way of exporting a method
exports.newPasswordMail=(email,accessToken) => {
    // console.log("Inside new Comment mailer",post);
    
    let htmlString=nodeMailer.renderTemplate({accessToken:accessToken},'/users/password_mail.ejs'); //extnsn '.ejs' also
    
    nodeMailer.transporter.sendMail({
        from:'codeial0205@gmail.com',
        to:email,
        subject:"Codeial | Password Reset",
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

