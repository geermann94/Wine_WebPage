const fs = require('fs');
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
let {check,validationResult,body} = require("express-validator");

const usersController = require('../controllers/usersController');

router.get("/", usersController.login);

router.post("/",[

    check("Email").isEmail().withMessage("El email debe ser un email valido"),
    check("Contraseña").isLength({min: 6}).withMessage("La contraña dabe tener al mnenos 6 caracteres"),

] ,usersController.processLogin)

router.get("/salir", usersController.logOut)

module.exports = router;

