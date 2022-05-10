const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "UFree" });
  },
};

module.exports = HomeController;