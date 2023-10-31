const userModel = require("../models/user.model");

const signup = async (req, res, next) => {
  try {
    const user = await userModel.create(req.body);
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  signup,
};
