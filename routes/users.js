const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.get("/new", UsersController.New);
router.post("/", UsersController.Validate("Create"), UsersController.Create);
router.get("/:id", UsersController.Index);

module.exports = router;
