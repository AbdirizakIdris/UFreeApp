const User = require("../models/users");

const AddFriendController = {
  Index: async (req, res) => {
    const allUsers = await User.find()
    res.render("addfriend/index", {users: allUsers.reverse()});
  },

  Add: (req, res) => {

    User.findOne({email: req.session.user.email}, (err, user) => {
      if (err) {
        throw err;
      }

      user.friends.push(req.body.selectedFriend);

      user.save((err) => {
        if (err) {
          throw err;
        }
        res.status(201).redirect("/addFriend");
      });
    });
  },
};

module.exports = AddFriendController;