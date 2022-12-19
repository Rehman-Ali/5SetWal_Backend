var exports = (module.exports = {});
const sequelize = require('sequelize')
const Model = require("../models");
const wp_posts = Model.wp_posts;
const Op = sequelize.Op;






// display all Post
exports.getAllPost = async (req, res, next) => {
  try {
    console.log("working here")
    let data = await wp_posts.findAll({
      where: {
        post_type:'post'
      }
    });
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
    res.status(500).json({
      data: [],
      message: "Server Internal Error.",
      success: 0
    })
  }

};




