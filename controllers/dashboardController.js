var exports = (module.exports = {});
const Model = require("../models");
const wp_users = Model.wp_users;
const wp_posts = Model.wp_posts;

// dispaly dashboard
exports.dashboard = async (req, res, next) => {
  try {
    let data = await wp_users.findAll();
    const postLength = await wp_posts.findAll({
      where: { post_type: "post" },
    });
    const userInActive = await wp_users.findAll({
      where: {
        user_status: 0,
      },
    });
    const userActive = await wp_users.findAll({
      where: {
        user_status: 1,
      },
    });
    if (data.length < 0) {
      res.json({
        message: "No data found!",
        success: 0,
      });
    } else {
      res.status(200).json({
        message: "Data get successfully.",
        success: 1,
        data: {
          totalUsers: data.length,
          totalPosts: postLength.length,
          totalActive: userActive.length,
          totalInActive: userInActive.length,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Internal Error.",
      error,
      success: 0,
    });
  }
};
