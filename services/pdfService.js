const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const createPDF = (data, outputDir) => {
    return new Promise((resolve, reject) => {
        // Ensure the directory exists
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Create a PDF document
        const doc = new PDFDocument();
        const email = data.email;
        const username = email.split('@')[0];
        const fileName = `${username}.pdf`;
        const filePath = path.join(outputDir, fileName);
        const writeStream = fs.createWriteStream(filePath);
        doc.pipe(writeStream);

        // Add an image to the document, centered at the top of the page
        const imagePath = './assets/images/shankhanaad-pdf.png';
        const imageWidth = 300;
        const imageHeight = 250;
        const pageWidth = doc.page.width;
        const x = (pageWidth - imageWidth) / 2;

        doc.image(imagePath, x, 50, {
            width: imageWidth,
            height: imageHeight
        });

        doc.moveDown(18);

        doc.fontSize(24).text('Your Registration Details', { align: 'center' });
        doc.moveDown(2);

        const reqBody = {
            Name: data.fullname,
            Email: data.email,
            Mobile: data.mobile,
            DOB: data.dob,
            Gender: data.gender,
            Reference: data.refName,
            Instrument: data.instrument
        };

        for (const key in reqBody) {
            if (reqBody.hasOwnProperty(key)) {
                doc.fontSize(20).text(`${key}  :-  ${reqBody[key]}`, {
                    width: 510,
                    align: 'left'
                });
                doc.moveDown(1);
            }
        }

        doc.moveDown(2);

        // Add Marathi text using the custom font
        const marathiFontPath = './assets/font/Lohit_Marathi_Regular.ttf';
        doc.font(marathiFontPath).fontSize(14);
        doc.text('अटी व नियम', { align: 'center' });
        doc.moveDown(0.5);
        const marathiText = [
            'पथक प्रमुखांनी दिलेल्या सूचनांचे शिस्तीत व काटेकोरपणे पालन करण्याची जबबदारी वादकांनी घ्यावी.',
            'सरावाच्या वेळेत (सायंकाळी ६.०० ते रात्री १०.००) येणे बंधनकारिक राहील.',
            'सर्व वादकांनी वाद्याची काळजी घेणे गरजेचे आहे.',
            'जर कोणत्याही वाद्यकाला वेळेच्या आधी अथवा दुसऱ्या दिवशी सरावाला येणे जमणार नसल्यास तशी पूर्वकल्पना पथक प्रमुखांना देणे गरजेचे आहे.',
            'सर्व वादकांनी वाद्य दुरुस्तीसाठी येणे गरजेचे आहे.',
            'सर्व वादकांनी वरील नियमांचे पालन करावे.'
        ];
        doc.list(marathiText, {
            width: 410,
            align: 'left'
        });

        doc.end();

        writeStream.on('finish', () => {
            resolve(filePath);
        });

        writeStream.on('error', (err) => {
            reject(err);
        });
    });
};

module.exports = {
    createPDF
};
