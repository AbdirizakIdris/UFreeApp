const User = require("../models/users");

const UsersController = { 
  New: (req, res) => {
      res.render("users/new", {});
  },

  async Create(req,res) {
      const user = new User(req.body);
      const email = req.body.email;
      if (req.body.email !== req.body.confirmEmail || req.body.password !== req.body.confirmPassword ){
        return res.redirect("users/new");
      }
      if (await User.exists({email: email})) {
        return res.redirect("users/new");
      }

      await user.save()
      res.status(210).redirect("/sessions/new")
  },
  Personal: (req, res) => {
    res.render("users/personal-page", {targetUser: req.session.user});
  },

  AddAFriend: (req, res) => {
    res.render("users/alluserspage");
  },

  NewGroup: (req, res) => {
    res.render("users/createagroup");
  },

};

module.exports= UsersController;