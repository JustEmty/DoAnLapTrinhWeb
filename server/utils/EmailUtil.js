//CLI: npm install nodemailer --save
const nodemailer = require('nodemailer');
const MyConstants = require('./MyConstants');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: MyConstants.EMAIL_USER,
        pass: MyConstants.EMAIL_PASS
    }
});
const EmailUtil = {
    send(email, id, token){
        const text = 'Cảm ơn bạn đã đăng ký, vui lòng nhập những thông tin sau để kích hoạt tài khoản của bạn:\n\t .id: ' + id + '\n\t .token: ' + token;
        return new Promise(function(resolve, reject){
            const mailOptions = {
                from: MyConstants.EMAIL_USER,
                to: email,
                subject: 'Đăng ký | Xác minh',
                text: text
            };
            transporter.sendMail(mailOptions, function(err, result){
                if(err) reject(err);
                resolve(true);
            });
        });
    }
};
module.exports = EmailUtil;