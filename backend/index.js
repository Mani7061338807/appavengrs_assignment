const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();
const passport = require("passport");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const authRoutes = require("./src/routes/auth");
const googlesheet = require("./src/routes/googlesheet");

const app = express();

//db connect
const dbConnection = async () => {
  const db_uri = process.env.MONGO_URI;
  try {
    await mongoose.connect(db_uri);
    console.log("db connected!");
  } catch (error) {
    console.log(error);
  }
};

dbConnection();

//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.use(
  session({
    secret: "majdjsajdh",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: "strict", // For cross-origin requests
    },
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log("Session ID:", req.sessionID);
  console.log("Session Data:", req.session);
  console.log("Is Authenticated:", req.isAuthenticated());
  console.log("User:", req.user);
  next();
});
console.log('hello')
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/", authRoutes);
app.use("/", googlesheet);



app.listen(3001, () => {
  console.log("server started..");
});
