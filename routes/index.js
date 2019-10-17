// =====================================================================================================================================
// Packages and Models require 
const express = require('express');
const router  = express.Router();
const axios = require('axios')
const Leads = require(`../models/leads`);
const Store = require(`../models/stores`);

// =====================================================================================================================================
// Landing Page
router.get('/', (req, res, next) => {
  res.render('landingPage')
})

// =====================================================================================================================================
// Leads
router.get('/leads', (req, res, next) => {
  res.render('testeLeads')
})

router.post('/leads', (req, res, next) => {
  const { email } = req.body;
  
  const newLeads = new Leads ({
    email,
  })

  newLeads.save()
    .then(res.render('/', { message: "E-mail cadastrado" }))
    .catch(res.render('/', { message: "Não foi possível realizar a operação, e-mail já cadastrado" }))
})

// =====================================================================================================================================
// Profile

router.get('/dashboard', (req, res, next) => {
  Leads.find()
    .then(leads => {
      res.render('dashboard', {leads})
    })
    .catch(err => console.log(err)
    )
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
        .then(res.redirect('/adress'))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

// =====================================================================================================================================
// Sending stores to Front-End

router.get('/stores', (req, res, next) => {
  Store.find()
    .then(store => {res.json(store)})
    .catch(err => console.log(err))
})
  
  


module.exports = router;