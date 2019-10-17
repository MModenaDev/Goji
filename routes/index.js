// =====================================================================================================================================
// Packages and Models require 
const express = require('express');
const router  = express.Router();
const Leads = require(`../models/Leads`);




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
    .then(res.redirect('/', { message: "E-mail cadastrado" }))
    .catch(err=>console.log(err))
})

  
  


module.exports = router;