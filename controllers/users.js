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

  // NewGroup: (req, res) => {
  //   res.render("users/createagroup");
  // },
  NewGroup: (req, res) => {
    res.render("groups/new", {});
  },

  CreateGroup: async (req, res) => {
    User.findOne({email: req.session.user.email}, (err, user) => {
      if (err) {
        throw err;
      }
      
      user.groups.push(req.body.groupName);
      user.save((err) => {
        if (err) {
          throw err;
        }
        res.status(210).redirect("/users/personal-page")
      });
    })
  },
  BookDay: async(req) => {
    User.findOne({email: req.session.user.email}, (err, user) => {
      if (err) {
        throw err;
      }
      
      console.log("======= ID =======")
      console.log(req.body.dateAvailability)
      console.log("==================")


      user.dateAvailability.push(req.body.dateAvailability);
      user.save((err) => {
        if (err) {
          throw err;
        }
        // res.status(210).redirect("/users/groups")
      });
    })
  }, 
  ViewCalendar: (req,res) => {
    res.render('groups/index')
  },
  ViewNextCalendar: (req,res) => {
    res.render('groups/next-month')
  },
  ViewThirdCalendar: (req,res) => {
    res.render('groups/third-month')
  },
};

module.exports= UsersController;