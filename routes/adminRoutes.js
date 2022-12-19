const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const auth = require("../middleware/auth");




/////////////
//// Routes for User Login and forgot password
/////////////

router.post("/signin", userController.login);





///////////////////////////////////////
///// Routes for User
///////////////////////////////////////

router.get("/users", auth, userController.getAllUser);
router.post("/user", auth, userController.register);
router.get("/user/:id", auth, userController.getSingleUser);
router.put("/user/:id", auth, userController.updateSingleUser);
router.delete("/user/:id", auth, userController.deleteUser);
router.put("/user/forgot-password/:id", auth, userController.forgotPassword);





///////////////////////////////////////
///// Routes for Post
///////////////////////////////////////

router.get("/post", auth, postController.getAllPost);
router.get("/post/:id", auth, postController.getSinglePost);
router.put("/post/:id", auth, postController.updateSinglePost);
router.delete("/post/:id", auth, postController.deletePost);


module.exports = router;
