var exports = (module.exports = {});
const sequelize = require("sequelize");
const Model = require("../models");
const wp_posts = Model.wp_posts;
const Op = sequelize.Op;

// display all Post
exports.getAllPost = async (req, res, next) => {
  try {
    console.log("working here");
    let data = await wp_posts.findAll({
      where: {
        post_type: "post",
      },
    });
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

// update single Post Data
exports.updateSinglePost = async (req, res, next) => {
  await wp_posts.update(req.body, {
    where: {
      ID: req.params.id,
    },
  });
  res.status(200).json({
    message: "Post updated succesfully",
    success: 1,
  });
};

// display single Post data
exports.getSinglePost = async (req, res, next) => {
  try {
    let id = req.params.id;
    let data = await wp_posts.findOne({
      where: {
        ID: id,
      },
       paranoid: false
    });

    if (data === null || data == undefined) {
      res.status(200).json({
        data: data,
        message: "No post exist",
        success: 1,
      });
    } else {
      res.status(200).json({
        data: data,
        message: "Post get Successfully.",
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

// Delete Post
exports.deletePost = async (req, res, next) => {
  try {
    let id = req.params.id;
    let post = await wp_posts.findOne({ where: { ID: id } });
    if (post === null) {
      return res.status(400).json({
        message: "post does not exist.",
        success: 0,
      });
    } else {
      await wp_posts.destroy({
        where: {
          ID: id,
        },
      });
      return res.status(200).json({
        message: "post deleted successfully.",
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



// get Deleted Post
exports.getDeletedPost = async (req, res, next) => {
  try {

    let deletedPost = await wp_posts.findAll(
      { where: { deletedAt: { [Op.not]: null } }, paranoid: false }
    );

    if (deletedPost !== null) {
      return res.status(200).json({
        data: deletedPost,
        message: "post get successfully.",
        success: 1,
      });
    } else {
      return res.status(200).json({
        data: [],
        message: "no post found.",
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


// restore Deleted Post
exports.restoreDeletedPost = async (req, res, next) => {
  try {
    let id = req.params.id
    await wp_posts.restore(
      { where: { ID: id } }
    );

    return res.status(200).json({
      message: "post restore successfully.",
      success: 1,
    });



  } catch (error) {
    res.status(500).json({
      message: "Server Internal Error.",
      success: 0,
    });
  }
};



// Delete Post Permanent
exports.deletePostPermanent = async (req, res, next) => {
  try {
    let id = req.params.id;
    let post = await wp_posts.findOne({ where: { ID: id }, paranoid: false });
    if (post === null) {
      return res.status(400).json({
        message: "post does not exist.",
        success: 0,
      });
    } else {
      await wp_posts.destroy({
        where: {
          ID: id,
        },
        force: true
      });
      return res.status(200).json({
        message: "post deleted successfully.",
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
