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
          req.session.user = user;
          res.redirect("/personal-page");
        });
    },
}     

module.exports = SessionsController;