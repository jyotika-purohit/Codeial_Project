const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');

let transporter=nodemailer.createTransport({
    service:'gmail',
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:'codeailproject@gmail.com',
        pass:'codeial_pwd@12'
    },tls:{
        rejectUnauthorized: false
    }

});

let renderTemplate=(data,relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log("Error: ",err);
                return;
            }
            console.log("AT NODEMAILER RENDER TEMPLATE!!!!");
            mailHTML=template;
        }
    )
    return mailHTML;

}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}