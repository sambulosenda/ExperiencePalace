const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const user = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
const posts = require("./routes/api/posts");

const passport = require("passport");

const app = express();

//Body passer middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config
const db = require("./config/keys").mongoURI;

//connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//passort middlewear
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

//use routes
app.use("/api/user", user);
app.use("/api/profiles", profiles);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("server running"));
