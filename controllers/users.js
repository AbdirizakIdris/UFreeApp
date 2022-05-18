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
        return res.redirect("users/new#repeatedemail");
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

    const groupsList = targetUser.groups;

    for (let i = 0 ; i < groupsList.length ; i++) {
      const group = await User.findOne({ email: groupsList[i] })
     console.group(group)
    }
    res.render("users/personal-page", { friends: friendsNames.reverse(), groups: groupsList.reverse(), targetUser: req.session.user});

   },

  AddAFriend: (req, res) => {
    res.render("users/alluserspage");
  },

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
  BookDay: async(req,res) => {
    User.findOne({email: req.session.user.email}, (err, user) => {
      if (err) {
        throw err;
      }
      
      user.dateAvailability.push(req.body.dateAvailability);
      user.save((err) => {
        if (err) {
          throw err;
        }
        res.status(210).redirect("/users/groups")
      });
    })
  }, 

  ViewCalendar: (req,res) => {
    res.render('groups/index', { username: req.session.user.firstName })
  },

};

module.exports= UsersController;
