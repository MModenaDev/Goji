const express = require('express');
const router = express.Router();
const passport = require('passport');

const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const Admin = require('../models/admin')

// ======================================================================================================================
// LOGIN

router.get("/login", (req, res, next) => {
    res.render("login")
})

router.post("/login", passport.authenticate('local-login', {
  successRedirect: "/dashboard",
  failureRedirect: "/auth/login",
  failureFlash: true
}));

// ======================================================================================================================
// LOGOUT

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

// ======================================================================================================================
// SIGN-UP (delete after creation)

router.get("/signup", (req, res, next) => {
    res.render("signup")
})

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  const newUser = new Admin({
    username,
    password: hashPass,
  });
  
  newUser
        .save()
        .then(() => {
          res.redirect("/auth/login");
        })
        .catch(error => {
          next(error)
        })
});

module.exports = router;