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

    //TODO move this to session checker
    if (!req.session.user) {
      res.status(210).redirect("/sessions/new")
      return;
    }

    const targetUser = await User.findOne({ email: req.session.user.email }); //targetUser = User currently logged in
    let friendsNames = [];
    const friendsList = targetUser.friends;

    let friendAvailability = [];
    for (let i = 0 ; i < friendsList.length ; i++) {
      const friend = await User.findOne({ email: friendsList[i] })
      let friendFullName = `${friend.firstName} ${friend.lastName}`;
      friendsNames.push(friendFullName);

      // get the availability for this friend and store it in an object
      friendAvailability.push({
        name : friend.firstName,
        dateAvailability : friend.dateAvailability
      })
    }

    const groupsList = targetUser.groups;
    
    res.render("users/personal-page", { friends: friendsNames.reverse(), groups: groupsList.reverse(), targetUser: req.session.user, friendAvailability : friendAvailability});

  },

  AddAFriend: (req, res) => {
    res.render("users/alluserspage");
  },

  NewGroup: (req, res) => {
    res.render("groups/new", {});
  },

  CreateGroup: async (req, res) => {
    if (!req.session.user) {
      res.status(210).redirect("/sessions/new")
      return;
    }

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
    if (!req.session.user) {
      res.status(210).redirect("/sessions/new")
      return;
    }

    User.findOne({email: req.session.user.email}, (err, user) => {
      if (err) {
        throw err;
      }
      
      user.dateAvailability.push({ title: req.session.user.firstName, date : req.body.dateAvailability});
      user.save((err) => {
        if (err) {
          throw err;
        }
        res.status(210).redirect("/users/groups")
      });
    })
  }, 

  ViewCalendar: async (req,res) => {
    if (!req.session.user) {
      res.status(210).redirect("/sessions/new")
      return;
    }
    const targetUser = req.session.user
    let group = targetUser.groups[0]
    let members = []

    User.find({groups: group}, (err, user) => {    
      user.forEach((member) => {
        members.push(member)  
      })
    })

    res.render('groups/index', { memberList: members })
  },
};

module.exports = UsersController;
