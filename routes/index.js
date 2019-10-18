// =====================================================================================================================================
// Packages and Models require 
const express = require('express');
const router  = express.Router();
const axios = require('axios')
const Leads = require(`../models/leads`);
const Store = require(`../models/stores`);
const nodemailer = require('nodemailer');

// =====================================================================================================================================
// Authentication Middleware

function check() {
  return function (req, res, next) {
      if (req.isAuthenticated()) {
          return next();
      } else {
          res.redirect('/')
      }
  }
}

const checkLogedIn = check();


// =====================================================================================================================================
// Landing Page
router.get('/', (req, res, next) => {
  res.render('landingPage')
})

// =====================================================================================================================================
// Leads

router.post('/leads', (req, res, next) => {
  const { email } = req.body;
  
  const newLeads = new Leads ({
    email,
  })

  newLeads.save()
    .then(() => {
      let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PSWD
        }
      });

      let textMessage = `
      GOJI

      You have recieved 15% off.

      Your interest has been noted,
      we will keep you posted of new developments.

      If you want to contribute towards a better product, please take the survey below.

      http̣://www.google.com

      Thank you,
      Grupo 6
      `

      let htmlMessage = `
        <div style="width: 80%; margin: 80px auto">
          <h1>GOJI</h1>
          <br>
          <p>You have recieved 15% off.</p>
          <br>
          <p>Your interest has been noted,</p>
          <p>we will keep you posted of new developments.</p>
          <br>
          <p>If you want to contribute towards a better product, please take the survey below.</p>
          <br>
          <a href="http̣://www.google.com" style="border: 1px solid black; text-decoration: none; color: white; background-color: black; padding: 10px; border-radius: 5px;">TAKE SURVEY</a>
          <br>
          <br>
          <h4>Thank you,</h4>
          <h2>Genki Foods</h2>
        </div>
      `

      transporter
        .sendMail({
          from: `GOJI <goji.genki.contact@gmail.com>`,
          subject: "Thank You!", 
          to: email,
          text: textMessage,
          html: htmlMessage
        })
        .then(() => res.redirect('/'))
        .catch((err) => console.log(err))
    })
    .catch(res.render('landingPage', { message: "Não foi possível realizar a operação, e-mail já cadastrado" }))
})

// =====================================================================================================================================
// Dashboard

router.get('/dashboard/leads', checkLogedIn, (req, res, next) => {
  Leads.find()
    .then(leads => {
      res.render('dashboardLeads', {leads})
    })
    .catch(err => console.log(err))
})

router.get('/dashboard/map', checkLogedIn, (req, res, next) => {
  res.render('dashboardMap')
})

// =====================================================================================================================================
// Google API - Latitude/Longitude

router.get('/adress', (req, res, next) => {
  const { adress } = req.query
  const adressValue = adress.trim().replace(/ /g, '+');
  const adressAPI = axios.create({baseURL: `https://maps.googleapis.com/maps/api/geocode/json?address=${adressValue}&key=${process.env.GOOGLE_KEY}`})
  adressAPI
    .get()
    .then(adressInfo => {
      const { lat, lng } = adressInfo.data.results[0].geometry.location;

      const location = {
        type: 'Point',
        coordinates: [lng, lat]
        };

      const newStore = new Store ({
        adress,
        location: location,
      })
      
      newStore.save()
        .then(res.redirect('/'))
        .catch(err => console.log(err))
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/');
    })
})

// =====================================================================================================================================
// Sending stores to Front-End
router.get('/stores', (req, res, next) => {
  Store.find()
    .then(store => {res.json(store)})
    .catch(err => console.log(err))
})

module.exports = router;