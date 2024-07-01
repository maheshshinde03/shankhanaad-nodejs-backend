const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'shankhanaadpathakpune@gmail.com',
        pass: 'hdxg yrew ohan ojxj'
    }
});

const sendEmail = (data, pdfPath) => {
    return new Promise((resolve, reject) => {
        // Read HTML template file
        const templatePath = path.join(__dirname, '../templates/emailTemplate.html');
        let htmlContent = fs.readFileSync(templatePath, 'utf8');

        // Replace placeholders with actual data
        htmlContent = htmlContent.replace('{{fullname}}', data.fullname);

        const mailOptions = {
            from: {
                name: 'शंखनाद ढोल ताशा ध्वजपथक',
                address: 'shankhanaadpathakpune@gmail.com'
            },
            to: data.email,
            subject: 'Registered successfully',
            html: htmlContent,
            attachments: [
                {
                    filename: path.basename(pdfPath),
                    path: pdfPath
                }
            ]
        };

        transporter.sendMail(mailOptions);

        // transporter.sendMail(mailOptions, (error, info) => {
        //     if (error) {
        //         return reject(error);
        //     }
        //     resolve(info);
        // });
    });
};

module.exports = {
    sendEmail
};
