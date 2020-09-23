const nodemailer = require('nodemailer')
var array = []

const sendEmail = async options => {
    let transport = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.email,
            pass:process.env.password
        }
    })

    let mail_options = {
        from:'"Coding Hunt Team" <codinghunt9@gmail.com>',
        to: options.email,
        subject:'Welcome to Coding Hunt',
        html: 
        `<div>
            <h3 style="color:red;">Welcome to our page</h3>
            <p>Please verify the otp ${options.message} sent to you</p>
        </div>
        `
    }

    await transport.sendMail(mail_options)
    console.log("Mail sent to :" , options.email)
}

module.exports = sendEmail;
