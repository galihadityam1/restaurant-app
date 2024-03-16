const Helper = require("../helpers/helper.js");
const { User, Order } = require("../models/index.js");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

class UserController {
  static async googleLogin(req, res, next) {
    const { googleToken } = req.body;
    try {
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience:
          "209533812046-3e40sde7tbtomdgedlidltdnrpplcb4c.apps.googleusercontent.com",
      });
      const { email, name } = ticket.getPayload();
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          username: name,
          email,
          password: Math.random().toString(),
        },
      });
      const payload = { id: user.id };
      const access_token = Helper.signToken(payload);
      res
        .status(200)
        .json({ message: `Success Logged in as ${email}`, access_token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "EmailRequired" };
      }

      if (!password) {
        throw { name: "PassRequired" };
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "NoUserFound" };
      }

      const isPasswordValid = Helper.comparedPassword(password, user.password);
      if (!isPasswordValid) {
        throw { name: "InvalidLogin" };
      }

      const payLoad = {
        id: user.id,
        email: user.email,
      };
      const access_token = Helper.signToken(payLoad);

      res.status(200).json({ message: "success login", access_token });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const user = await User.create(req.body);
      const newUser = await User.findOne({
        where: { id: user.id },
        attributes: { exclude: ["password", "role"] },
      });

      res.status(201).json({ message: "User created", newUser });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
