var exports = (module.exports = {});
const sequelize = require('sequelize')
const bcrypt = require("bcryptjs");
const Model = require("../models");
const jwt = require("jsonwebtoken");
const config = require("config");
const wp_users = Model.wp_users;
const Op = sequelize.Op;




// router for login/signin user
exports.login = async (req, res, next) => {
  let email = req.body.user_email;
  let password = req.body.user_pass;
  let errors = false;

  if (email.length === 0 || password.length === 0) {
    errors = true;
    // send message
    res.status(400).json({
      message: "Please enter email and password",
      success: 0
    });
  }

  // if no error
  if (!errors) {
    let user = await wp_users.findOne({ where: { user_email: email } });
    if (!user || user === null) {
      res.status(400).json({
        message: "User does not exist.",
        success: 0
      });
    }
    const compare = await bcrypt.compare(
      password,
      user.dataValues.user_pass
    );

    if (compare) {
      const token = jwt.sign(
        { ID: user.dataValues.ID, user_email: user.dataValues.user_email },
        config.get("jwtPrivateKey")
      );
      res.status(200).json({
        message: "User login successfully.",
        success: 1,
        user_id: user.dataValues.ID,
        token: token
      });
    } else {
      res.status(400).json({
        message: "Email and password are wrong.",
        success: 0
      });
    }
  }

};


// display all User 
exports.getAllUser = async (req, res, next) => {
  try {
    let data = await wp_users.findAll();
    if (data.length < 0) {
      res.json({
        message: "No data found!",
        success: 0
      });
    } else {
      res.status(200).json({
        data: data,
        message: "Data get successfully.",
        success: 1,
      });
    }
  } catch {
    res.Status(500).json({
      data: [],
      message: "Server Internal Error.",
      success: 0
    })
  }

};




