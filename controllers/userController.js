var exports = (module.exports = {});
const sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const Model = require("../models");
const jwt = require("jsonwebtoken");
const config = require("config");
const wp_users = Model.wp_users;
const wp_posts = Model.wp_posts;
const Op = sequelize.Op;

// for signup or reigster user
exports.register = async (req, res, next) => {
  try {
    if (req.body.user_email === "" || req.body.user_pass === "") {
      return res.status(400).json({
        message: "Email and password are required",
        success: 0,
      });
    }
    let req_email = req.body.user_email;
    let email = req_email.toLowerCase();

    let user = await wp_users.findOne({ where: { user_email: email } });
    if (user !== null) {
      res.status(200).json({
        message: "User already exist.",
        success: 1,
      });
    } else {
      const hash = await bcrypt.hash(req.body.user_pass, 10);
      let body = {
        user_login: req.body.user_login,
        user_pass: hash,
        user_nicename: req.body.user_nicename,
        user_email: req.body.user_email,
        user_url: req.body.user_url,
        user_registered: req.body.user_registered,
        user_activation_key: req.body.user_activation_key,
        user_status: req.body.user_status,
        display_name: req.body.display_name,
      };
      await wp_users.create(body);

      res.status(200).json({
        message: "signup successfull",
        success: 1,
      });
    }
  } catch {
    res.status(500).json({
      message: "Server Error",
      success: 0,
    });
  }
};

// router for login/signin user
exports.login = async (req, res, next) => {
  let email = req.body.user_email;
  let password = req.body.user_pass;
  let errors = false;

  if (email.length === 0 || password.length === 0) {
    errors = true;
    // send message
    res.status(201).json({
      message: "Please enter email and password",
      success: 0,
    });
  }

  // if no error
  if (!errors) {
    let user = await wp_users.findOne({ where: { user_email: email } });
    if (!user || user === null) {
      return res.status(201).json({
        message: "User does not exist.",
        success: 0,
      });
    }
    const compare = await bcrypt.compare(password, user.dataValues.user_pass);

    if (compare) {
      const token = jwt.sign(
        { ID: user.dataValues.ID, user_email: user.dataValues.user_email },
        config.get("jwtPrivateKey")
      );
      res.status(200).json({
        message: "User login successfully.",
        success: 1,
        user_id: user.dataValues.ID,
        token: token,
      });
    } else {
      res.status(201).json({
        message: "Email and password are wrong.",
        success: 0,
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
        success: 0,
      });
    } else {
      res.status(200).json({
        data: data,
        message: "Data get successfully.",
        success: 1,
      });
    }
  } catch {
    res.status(500).json({
      data: [],
      message: "Server Internal Error.",
      success: 0,
    });
  }
};

// for add user
exports.addUser = async (req, res, next) => {
  let errors = false;
  if (
    // req.body.title.length === 0 ||
    req.body.user_email.length === 0
  ) {
    errors = true;

    // set flash message
    res.status(400).json({
      message: "Please enter email",
      success: 0,
    });
  }

  // if no error
  if (!errors) {
    await wp_users.create(req.body);
    res.status(200).json({
      message: "User added succesfully",
      success: 1,
    });
  } else {
    res.status(500).json({
      message: "Server error",
      success: 0,
    });
  }
};

// update single User Data
exports.updateSingleUser = async (req, res, next) => {
  await wp_users.update(req.body, {
    where: {
      ID: req.params.id,
    },
  });
  res.status(200).json({
    message: "User updated succesfully",
    success: 1,
  });
};

// display single User data
exports.getSingleUser = async (req, res, next) => {
  try {
    let id = req.params.id;
    let data = await wp_users.findOne({
      where: {
        ID: id,
      },
    });

    if (data === null || data == undefined) {
      res.status(200).json({
        data: data,
        message: "No user exist",
        success: 1,
      });
    } else {
      res.status(200).json({
        data: data,
        message: "User get Successfully.",
        success: 1,
      });
    }
  } catch (error) {
    res.status(500).json({
      data: [],
      message: "Server Internal Error.",
      success: 0,
    });
  }
};

// Delete User
exports.deleteUser = async (req, res, next) => {
  try {
    let id = req.params.id;
    let user = await wp_users.findOne({ where: { ID: id } });
    if (user === null) {
      return res.status(400).json({
        message: "user does not exist.",
        success: 0,
      });
    } else {
      await wp_users.destroy({
        where: {
          ID: id,
        },
      });
      return res.status(200).json({
        message: "user deleted successfully.",
        success: 1,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Internal Error.",
      success: 0,
    });
  }
};



// changePassword 
exports.changePassword = async (req, res, next) => {
  try {
    let id = req.user.ID;

    let user = await wp_users.findOne({ where: { ID: id } });
    console.log("ID========", user)
    if (!user || user === null) {
      return res.status(400).json({
        message: "User does not exist.",
        success: 0,
      });
    }
    const compare = await bcrypt.compare(
      req.body.old_password,
      user.dataValues.user_pass
    );

    if (compare) {
      const hash = await bcrypt.hash(req.body.new_password, 10);
      let body = {
        user_pass: hash,
      };
      await wp_users.update(body, {
        where: {
          ID: req.user.ID,
        },
      });
      return res.status(200).json({
        message: "Password update successfully.",
        success: 1,
      });
    } else {
      return res.status(400).json({
        message: "password does not match",
        success: 0,
      });
    }
  } catch (error) {
    res.status(500).json({
      data: [],
      message: "Server Internal Error.",
      success: 0,
    });
  }
};





// get Deleted User
exports.getDeletedUser = async (req, res, next) => {
  try {

    let deletedUser = await wp_users.findAll(
      { where: { deletedAt: { [Op.not]: null } }, paranoid: false }
    );

    if (deletedUser !== null) {
      return res.status(200).json({
        data: deletedUser,
        message: "user get successfully.",
        success: 1,
      });
    } else {
      return res.status(200).json({
        data: [],
        message: "no user found.",
        success: 1,
      });
    }


  } catch (error) {
    res.status(500).json({
      message: "Server Internal Error.",
      success: 0,
    });
  }
};


// restore Deleted User
exports.restoreDeletedUser = async (req, res, next) => {
  try {
    let id = req.params.id
    await wp_users.restore(
      { where: { ID: id } }
    );

    return res.status(200).json({
      message: "user restore successfully.",
      success: 1,
    });



  } catch (error) {
    res.status(500).json({
      message: "Server Internal Error.",
      success: 0,
    });
  }
};



// Delete User Permanent
exports.deleteUserPermanent = async (req, res, next) => {
  try {
    let id = req.params.id;
    let user = await wp_users.findOne({ where: { ID: id } });
    if (user === null) {
      return res.status(400).json({
        message: "user does not exist.",
        success: 0,
      });
    } else {
      await wp_users.destroy({
        where: {
          ID: id,
        },
        force: true
      });
      return res.status(200).json({
        message: "user deleted successfully.",
        success: 1,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Internal Error.",
      success: 0,
    });
  }
};
