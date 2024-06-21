const express = require('express');
const router = express.Router();
const adminService = require('../services/admin');
const path = require('path');
const fs = require('fs');


router.post('/login', async function (req, res, next) {
  try {
     
    let logindata = await adminService.adminLogin(req.body);
    const token = logindata.rows[0].token;

    if (logindata.message == 'password matched') {
      res.status(200).json({ token: token, status: 'OK' });
    } else if (logindata.message == 'password does not matched') {
      error = 'password does not matched';
      res.status(401).json({ error });
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
    // res.status(500).json({ status: 'fail' });  
  }
});

router.get('/getAllUsers', async function (req, res, next) {
  try {
    //
    let getData = await adminService.getAllUsers();
    res.send(getData);
  }
  catch (error) {
    //
    res.status(500).json({ error: error.message })
  }
});


router.get('/getUser/:id', async function (req, res, next) {
  try {
    //
    let UserData = await adminService.getUserData(req.params);
    res.send(UserData);
  }
  catch (error) {
    //
    res.status(500).json({ error: error.message })
  }
});

router.get('/getFilesByEmail/:email', (req, res) => {
  try {
    const email = req.params.email;
    const username = email.split('@')[0];

    const profileImageFilePath = path.resolve(__dirname, `../upload/photos/${username}.jpg`);
    const pdfFilePath = path.resolve(__dirname, `../upload/pdf/${username}.pdf`);

    const response = {
      status: 'partial_success',
      profileImage: null,
      pdfFile: null,
    };

    if (fs.existsSync(profileImageFilePath)) {
      const profileImage = fs.readFileSync(profileImageFilePath);
      response.profileImage = `data:image/jpeg;base64,${profileImage.toString('base64')}`;
    }

    if (fs.existsSync(pdfFilePath)) {
      const pdffile = fs.readFileSync(pdfFilePath);
      response.pdfFile = `data:application/pdf;base64,${pdffile.toString('base64')}`;
    }

    if (response.profileImage && response.pdfFile) {
      response.status = 'success';
    } else if (!response.profileImage && !response.pdfFile) {
      response.status = 'error';
      response.message = 'Files not found';
    }

    res.json(response);
  } catch (error) {
    console.error('Error in /getUserByEmail route:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

module.exports = router;