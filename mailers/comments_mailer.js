const nodeMailer=require('../config/nodemailer');

exports.newComment=(comment) => {
    let hmtlString=nodeMailer.renderTemplate({comment:comment},'/comments/newComment.ejs');
    console.log("AT NODEMIALER NEWCMNT");
    nodeMailer.transporter.sendMail({
    from:'codeailproject@gmail.com',
    to:comment.user.email,
    subject:'Comment Published !',
    hmtl:hmtlString
    },function(err,info){
        if(err){console.log("Error: ",err); return }

        console.log("Mail sent!");
        return;
    })

}


