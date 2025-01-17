const User = require("../models/userModels");
require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = new User({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            accessToken: accessToken,
          });

          await user.save();
        } else {
          if (user.accessToken !== accessToken) {
            user.accessToken = accessToken;
            await user.save();
          }
        }
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email", "https://www.googleapis.com/auth/spreadsheets"],
});

const googleCallback = (req, res) => {
  if (req.user) {

    const token = jwt.sign(
      { googleId: req.user.googleId},
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    console.log('generated token is',token)
    res.cookie("token", token, { httpOnly: true });
    res.redirect("http://localhost:3000/site");
  } else {
    res.status(401).json({ error: "Google authentication failed" });
  }
};
module.exports = {
  googleCallback,
  googleLogin,
};
