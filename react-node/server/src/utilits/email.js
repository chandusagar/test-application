import nodemailer from 'nodemailer';

 const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'chandusager43@gmail.com',
        pass:'chandu@1234'
    }
})

const mailOption = {
    from: 'chandusager43@gmail.com',
    to: 'chandusager43@gmail.com',
    subject: 'sending email nodejs',
    text:`welcome to our nodejs application.`
}

transporter.sendMail(mailOption, function (error,info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email send',info.response)
    }
})


