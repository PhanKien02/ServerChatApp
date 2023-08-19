const nodemailer = require("nodemailer");
import {mailActive} from "./templateMail"
var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "kien1st02@gmail.com",
        pass: "fhfvqgbdxbzbuhwo",
    },
});

const sendMail =async (to,name,subject,key) =>{
    
    let mailOptions = {
        from: "kien1st02@gmail.com",
        to: to,
        subject: subject,
        html:mailActive(name,key),
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log(`send mai to ${name} success`)
    } catch (error) {
        console.log(`send mai to ${name} error: `,error);
    }
}
export default sendMail;