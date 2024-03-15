const express = require("express");
const UserController = require("../controllers/UserController");
const loginValidation = require("../middlewares/authentication");
const Controller = require("../controllers/Controller");
const router = express.Router();
const uploader = require('../middlewares/uploader.js');


// login and registration section
router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.post("/google-login", UserController.googleLogin);

// login validation
router.use(loginValidation)


// CRUD menu
router.get("/menu", Controller.getAllMenu);
router.post("/menu", Controller.postMenu);
router.put("/menu/:id", Controller.editMenu);
router.delete("/menu/:id", Controller.deleteMenu);
router.patch('/menu/:id', uploader.single('image'), Controller.editImage)

// order
router.post("/menu/:id", Controller.addOrder);
router.patch("/payment", Controller.patchPayment);

module.exports = router;
