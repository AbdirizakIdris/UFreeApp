const User = require("../models/users");

const AddFriendController = {
  Index: async (req, res) => {
    const allUsers = await User.find();

    res.render("addfriend/index", { users: allUsers.reverse() });
  },

  Add: (req, res) => {

    User.findOne({email: req.session.user.email}, (err, user) => {
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

          User.findOne({friend: req.body.selectedFriend}, (err, user) => {
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

  AddFriendtoGroup: async (req, res) => {

    const targetUser = await User.findOne({email: req.session.user.email}); //targetUser = User currently logged in
    let friendsNames = [];
    const friendsList = targetUser.friends;

    for (let i = 0 ; i < friendsList.length ; i++) {
      const friend = await User.findOne({email: friendsList[i]})

      let friendFullName = `${friend.firstName} ${friend.lastName}`;

      friendsNames.push(friendFullName);
    }
   
    res.render("addfriend/add-friend-to-group", { friends: friendsNames.reverse() });
  },

};

module.exports = AddFriendController;