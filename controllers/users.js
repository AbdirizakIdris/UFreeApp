const User = require("../models/users");

const UsersController = { 
  New: (req, res) => {
      res.render("users/new", {});
  },

  async Create(req,res) {
      const user = new User(req.body);
    //   const email = req.body.email;

      await user.save()
      res.status(210).redirect("/")
  }

};

module.exports= UsersController;