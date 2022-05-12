const User = require("../models/users");

const SessionsController = {
    New: (req, res) => {
      res.render("sessions/new", {title: "Log in"});
    },

    Create: (req, res) => {
        console.log("trying to log in");
        const email = req.body.email;
        const password = req.body.password;

      
      User.findOne({ email: email }).then((user) => {
        if (!user) {
          res.redirect("/sessions/new#bademail");
        } else if (user.password !== password) {
          res.redirect("/sessions/new#badpassword");
        } else {
          req.session.user = user;
          res.redirect("/users/personal-page");
        }
      });
    },

    Destroy: (req, res) => {
      console.log("logging out");
      if (req.session.user && req.cookies.user_sid) {
        res.clearCookie("user_sid");
      }
      res.redirect("/sessions/new");
      },
}     

module.exports = SessionsController;