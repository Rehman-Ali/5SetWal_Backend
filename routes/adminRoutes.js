const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");




/////////////
//// Routes for User Login and forgot password
/////////////

router.post("/signin", userController.login);





///////////////////////////////////////
///// Routes for User
///////////////////////////////////////

router.get("/users", auth, userController.getAllUser)






module.exports = router;
