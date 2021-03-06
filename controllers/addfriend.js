const User = require("../models/users");

const AddFriendController = {
  Index: async (req, res) => {
    const allUsers = await User.find();
    const currentUser = req.session.user;
    const userChecker = (user) => {
      if (!(currentUser.email === user.email)) {
        return user
      }
    };
    
    const leUsers = allUsers.reverse();
    const everyUser = leUsers.filter(element => userChecker(element));
    let potentialFriends = [];
    let currentFriends = [];
    
    everyUser.forEach(e => {
      if (!currentUser.friends.includes(e.email)) {
          potentialFriends.push(e);
      }
      else {
        currentFriends.push(e);
      }
    });

    console.log(currentFriends);
    res.render("addfriend/index", {checkEveryUser: potentialFriends , currentFriends : currentFriends} );
  },

  Add: (req, res) => {

    User.findOne({ email: req.session.user.email }, (err, user) => {  //finding a field on the database with the label "email"
      if (err) {
        throw err;
      }

      const newFriend = req.body.selectedFriend;
      const thisUser = req.session.user  

      if (!(thisUser.friends.includes(newFriend))) {
        user.friends.push(newFriend);

        user.save((err) => {
          if (err) {
            throw err;
          }

          User.findOne({email: req.body.selectedFriend}, (err, user) => {
            if (err) {
              throw err;
            }

            user.friends.push(req.session.user.email);
            
            user.save((err) => {
              if (err) {
                throw err;
              }

              res.status(201).redirect("/addFriend");
            });
          });
        });  
      }   
    });
  },

  ShowFriends: async (req, res) => {

    const targetUser = await User.findOne({ email: req.session.user.email }); //targetUser = User currently logged in
    let friendsNames = [];
    const friendsList = targetUser.friends;

    for (let i = 0 ; i < friendsList.length ; i++) {
      const friend = await User.findOne({ email: friendsList[i] })

      let friendFullName = `${friend.firstName} ${friend.lastName}`;

      friendsNames.push(friendFullName);
    }

    res.render("addfriend/add-friend-to-group", { friends: friendsNames.reverse(), friendsEmails: targetUser.friends.reverse(), groupName: targetUser.groups[0] });
  },

  AddFriendToGroup: async (req, res) => {

    User.findOne({email: req.session.user.email}, (err, user) => {

    const group = user.groups[0]

      User.findOne({email: req.body.groupMember}, (err, user) => {
        if (err) {
          throw err;
        }
  
        if (!(user.groups.includes(group))) {
          user.groups.push(group);

          user.save((err) => {
            if (err) {
              throw err;
            }

            res.status(201).redirect("/addfriend/add-friend-to-group");
          });
        }
      });
    });
  },
};

module.exports = AddFriendController;