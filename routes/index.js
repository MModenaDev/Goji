// =====================================================================================================================================
// Packages and Models require 
const express = require('express');
const router  = express.Router();
const Leads = require(`../models/leads`);




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


  
  


module.exports = router;