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
  Personal: async (req, res) => {
    
    const targetUser = await User.findOne({ email: req.session.user.email }); //targetUser = User currently logged in
    let friendsNames = [];
    const friendsList = targetUser.friends;
    
    for (let i = 0 ; i < friendsList.length ; i++) {
      const friend = await User.findOne({ email: friendsList[i] })
      
      let friendFullName = `${friend.firstName} ${friend.lastName}`;

      
      friendsNames.push(friendFullName);
    }
    
    res.render("users/personal-page", { friends: friendsNames.reverse(), targetUser: req.session.user});
    
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
        res.status(210).redirect("/addfriend/add-friend-to-group")
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