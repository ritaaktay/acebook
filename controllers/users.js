const User = require("../models/user");
const { body, validationResult } = require("express-validator");
// const { body } = require("express-validator");

const UsersController = {
  Index: (req, res) => {
    const userID = req.params.id;
    User.findById(userID)
      .populate("friends")
      .then((user) => {
        const viewUser = {
          name: user.name,
          friends: user.friends,
        };
        viewUser.image = `data:${
          user.image.contentType
        };base64,${user.image.data.toString("base64")}`;
        res.render("users/index", { user: viewUser });
      });
  },

  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: (req, res) => {
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      // return;
      console.log("THERE IS AN ERROR");
    }

    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        if (err.name === "MongoError" && err.code === 11000) {
          // Duplicate email
          return res
            .status(422)
            .render("error", { message: "This email already exists" });
        }
      }
      res.status(201).redirect("/posts");
    });
  },

  Validate: (method) => {
    switch (method) {
      case "Create": {
        // console.log("Case create is running");
        // console.log(body("name"));
        return [
          // todo: try removing 'en-US'
          body(["name", "name field is filled in and is numeric"])
            .exists()
            .isNumeric(),
          // // .isAlpha("en-US", { ignore: " -" }),
          // body("email", "invalid email").exists().isEmail(),
          // // todo: fine tune how we want passwords to be...
          // body("password", "password does not meet requirements").exists(),
        ];
      }
    }
  },
};

module.exports = UsersController;
