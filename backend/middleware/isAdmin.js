const isAdmin = async (req, res, next) => {
  try {
    const user = req.user;

    if (user.role != "admin") {
      return res.json({
        success: false,
        msg: "Invalid user..",
      });
    }

    next();
  } catch (error) {
    return res.json({
      success: false,
      msg: error.message,
    });
  }
};
export default isAdmin;
