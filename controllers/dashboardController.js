var exports = (module.exports = {});
const Model = require("../models");
const wp_users = Model.wp_users;
const wp_posts = Model.wp_posts;
const moment = require("moment")
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


// get graph data`
exports.dashboardGraph = async (req, res, next) => {
  try {
    var userData = await wp_users.findAll();
    var postData = await wp_posts.findAll({
      where:{
        post_type: 'post'
      }
    });
    var userDataAccordingToMonth = [0,0,0,0,0,0,0,0,0,0,0,0];
    var postDataAccordingToMonth = [0,0,0,0,0,0,0,0,0,0,0,0];
   
    for(var i = 0; i < userData.length; i++){
      let indexMonth = moment(userData[i].dataValues.createdAt).month() ;
      userDataAccordingToMonth[indexMonth] = userDataAccordingToMonth[indexMonth] + 1
    }
    
    for(var j = 0; j < postData.length; j++){
      let indexMonthForPost = moment(postData[j].dataValues.post_date).month() ;
      postDataAccordingToMonth[indexMonthForPost] = postDataAccordingToMonth[indexMonthForPost] + 1
    }
    
     res.status(200).json({
      message:'Data get successfully',
      success: 1,
      userByMonthData: userDataAccordingToMonth,
      postByMonthData : postDataAccordingToMonth

    })

   
  } catch (error) {
    res.status(500).json({
      message: "Server Internal Error.",
      error,
      success: 0,
    });
  }
};
