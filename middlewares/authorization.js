
async function AuthorizationAdmin(req, res, next) {
  try {
    if (req.user.role !== "admin") {
      throw { name: "Forbidden" };
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { AuthorizationAdmin };
