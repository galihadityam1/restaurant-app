const express = require("express");
const UserController = require("../controllers/UserController");
const loginValidation = require("../middlewares/authentication");
const Controller = require("../controllers/Controller");
const router = express.Router();

router.post('/login', UserController.login)
router.post('/register', UserController.register)

router.use(loginValidation)
router.get('/menu', Controller.getAllMenu)
router.post('/menu', Controller.postMenu)
router.put('/menu/:id', Controller.editMenu)
router.delete('/menu/:id', Controller.deleteMenu)
router.post('/menu/:id', Controller.addOrder)

module.exports = router;
