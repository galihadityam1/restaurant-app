const { User } = require("../models");
const Helper = require("../helpers/helper");

async function loginValidation(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw { name: "LoginValidation" };
    }

    const [type, token] = authorization.split(" ");
    if (type !== "Bearer") {
      throw { name: "LoginValidation" };
    }

    const { id } = Helper.verifyToken(token);

    const user = await User.findByPk(id);
    if (!user) {
      throw { name: "LoginValidation" };
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = loginValidation;
