const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");
const validator = require("../controllers/users");

router.get("/new", UsersController.New);
router.post("/", UsersController.validate('Create'), UsersController.Create);
router.get("/:id", UsersController.Index);

module.exports = router;
