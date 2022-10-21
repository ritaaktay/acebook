const User = require("../models/user");
const { body, validationResult } = require("express-validator");

const SessionsController = {
  New: (req, res) => {
    res.render("sessions/new", {});
  },

  Create: (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).render("sessions/new", {
        message: errors.array()[0].msg,
      });
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then((user) => {
      if (!user) {
        res.render("sessions/new", {
          message: "No user exists with that email",
        });
      } else if (user.password != password) {
        res.render("sessions/new", {
          message: "You entered a wrong password",
        });
      } else {
        req.session.user = user;
        res.redirect("/posts");
      }
    });
  },

  Destroy: (req, res) => {
    console.log("logging out");
    if (req.session.user && req.cookies.user_sid) {
      res.clearCookie("user_sid");
    }
    res.redirect("/sessions/new");
  },

  Validate: (method) => {
    switch (method) {
      case "Create": {
        return [
          body("email", "Error: Invalid email, you dummy. Try again!")
            .exists()
            .isEmail(),
          // todo: add validation for password input once implemented on UsersController
        ];
      }
    }
  },
};

module.exports = SessionsController;
