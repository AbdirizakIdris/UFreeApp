const SessionsController = {
    New: (req, res) => {
      res.render("sessions/new", {title: "Log in"});
    },

    Create: (req, res) => {
        console.log("trying to log in");
        const email = req.body.email;
        const password = req.body.password;
    },
    
}     
module.exports = SessionsController;