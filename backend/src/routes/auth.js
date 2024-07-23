const passport = require("passport");
const express = require("express");
const { googleLogin, googleCallback } = require("../controllers/authController");

const router = express.Router();

router.get("/auth/google", googleLogin);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000",
  }),
  googleCallback
);

router.get("/login/success", (req, res) => {

  if (req.user) {
    return res.status(200).json({
      message: "login success",
      user: req.user,
    });
  }
  return res.status(401).json({ message: "user not found" });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:3000");
});

module.exports = router

