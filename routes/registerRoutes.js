const express = require('express');
const router = express.Router();
let {check,validationResult,body} = require("express-validator");

const usersController = require('../controllers/usersController');

router.get('/', usersController.registrar);


router.post('/' , [
    
    check("Nombre").isLength({min: 1}).withMessage("El campo Nombre debe estar completo"),
    check("Apellido").isLength({min: 1}).withMessage("El campo Apellido debe estar completo"),
    check("Email").isEmail().withMessage("El email debe ser un email valido"),
    check("Contraseña").isLength({min: 6}).withMessage("La contraña dabe tener al mnenos 6 caracteres"),

    body("Email").custom(function(value){
        let users = require("../data/usuarios.json");

        let mailBuscado = users.filter(function(user){
            return (user.email == value)
        });

        if(mailBuscado.length != 0){
            return false;
        }
        return true;
    }).withMessage("El email ya esta en uso!"),

    body("repContraseña").custom(function(value, {req}){
        
        if(req.body.Contraseña != value){
            return false;
        }
        return true;
    }).withMessage("Las contraseñas no coinciden!")


], usersController.guardar);



module.exports = router;