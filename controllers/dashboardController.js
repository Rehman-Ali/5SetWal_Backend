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
exports.dashboardReports = async (req, res, next) => {
  const monthsName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Augu",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  try {
    const posts = await wp_posts.findAll({
      where: { post_type: "post" },
    });

    const num = [];
    for (let i = 0; i < monthsName.length; i++) {
      posts.reduce((total, curValue, curIndex, ar) => {
        num.push({
          month: monthsName[i],
          users: curValue.post_date.getMonth() + 1,
        });
      });
    }
    console.log(num);
    res.status(200).json({
      message: "success",
      success: 1,
      data: {
        post: posts.length,
        num,
        // monthly: monthsName,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Internal Error.",
      error: error.message,
      success: 0,
    });
  }
};
