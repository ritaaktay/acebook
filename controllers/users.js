const User = require("../models/user");
const { body, validationResult } = require("express-validator");

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
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(422)
        .render("error", { message: JSON.stringify(errors.array()[0].msg) });
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
        return [
          body(
            "name",
            "Error: Name should not include numbers or special characters, other than '-' and spaces."
          )
            .exists()
            // todo: allow accented characters
            .isAlpha("en-US", { ignore: " -" }),
          body("email", "Error: Invalid email, you dummy.").exists().isEmail(),
          // todo: fine tune how we want passwords to be...
          body("password", "password does not meet requirements")
            .exists()
            .isLength({ min: 5 }),
        ];
      }
    }
  },
};

module.exports = UsersController;
