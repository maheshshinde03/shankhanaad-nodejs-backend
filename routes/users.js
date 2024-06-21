const express = require('express');
const router = express.Router();
const userService = require('../services/users');
const pdfService = require('../services/pdfService');
const emailService = require('../services/emailService');

const fs = require('fs');
const multer = require('multer');
const path = require('path');

require('dotenv').config();


// router.get('/email', async function (req, res, next) {

//     const user = process.env.EMAIL_ADDRESS;
//     const pass = process.env.EMAIL_PASSWORD;

//     
//     

//     res.status(200).json({ email: user, password: pass });


// });

/* Check user ID existence and send response */
router.get('/check-email/:email', async function (req, res, next) {
    try {
        
        var isUser = await userService.checkEmail(req.params);
        if (isUser.status === 'user id Exist') {
            res.status(200).json({ status: 'true' });
        } else {
            res.status(200).json({ status: 'false' });
        }
    } catch (err) {
        res.status(500).json({ status: 'fail' });
    }
});

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = `./upload/photos`;
        fs.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const email = req.params.email;
        const username = email.split('@')[0];
        cb(null, `${username}.jpg`);
    }
});

const upload = multer({ storage: storage });

router.post('/uploadImage/:email', upload.single('upload'), (req, res) => {
    
    try {
        if (!req.file) {
            return res.status(400).json({ status: 'No file uploaded' });
        }

        
        res.status(200).json({ status: 'success', path: req.file.path });

    } catch (error) {
        console.error('Error during file upload:', error);
        res.status(500).json({ status: 'upload error', error });
    }
});

router.post('/registration', async function (req, res, next) {
    try {
        //res.status(200).json({ status: 'success' });
        
        let user = await userService.addUsers(req.body);

        if (user.status === 'OK') {
            // PDF creation
            const pdfDir = path.join(__dirname, '../upload/pdf');
            const pdfPath = await pdfService.createPDF(req.body, pdfDir);

            // Send email
            await emailService.sendEmail(req.body, pdfPath);

            res.status(200).json({ status: 'success' });

        } else {
            res.status(400).json({ status: 'error' });
        }
    } catch (err) {
        console.error('Error in /registration route:', err); // Improved error logging
        res.status(500).json({ status: 'error', message: err.message });
    }
});

module.exports = router;
