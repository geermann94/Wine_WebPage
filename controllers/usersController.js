const fs = require('fs');
const bcrypt = require("bcrypt")


let users = require("../data/usuarios.json");

let {check,validationResult,body} = require("express-validator");


module.exports = {

    registrar : function(req, res) {

        res.render('register');

    },

    guardar : function(req, res) {

        let errors = validationResult(req)
        
        if(errors.isEmpty()){

            let usuarioNuevo = {
                name: req.body.Nombre,
                lastName: req.body.Apellido,
                email: req.body.Email,
                password: bcrypt.hashSync(req.body.Contraseña,10)
            };
            
            users.push(usuarioNuevo)
    
            users = JSON.stringify(users, null, ' ');
    
            fs.writeFileSync('./data/usuarios.json', users);
            
            res.render("profile",{usuarioNuevo: usuarioNuevo});

        } else { 
            res.render("register", {errors: errors.errors})
        }

    },

    login : function(req, res) {

        return res.render("login")

    },

    processLogin : function(req, res) {

        let errors = validationResult(req)
        
        if(errors.isEmpty()){
            
            let usuarioBuscado = users.find(function(user,i){
                
                return user.email == req.body.Email
                
            });
            

            if(usuarioBuscado.length != 0){
                
                if(bcrypt.compareSync(req.body.Contraseña, usuarioBuscado.password)){
                    
                    req.session.usuarioLogueado = usuarioBuscado;
                    

                    if(req.body.Recordame){
                        res.cookie("Recordame",req.session.usuarioLogueado.email, {maxAge: 500000000})
                    }

                    res.redirect("/")

                } else {
                    res.render("login", {errors: [
                        {msg: "La contraseña no es valida!"}
                    ]})
                }
            } else {
                res.render("login", {errors: [
                    {msg: "El email no corresponde a un usuario registrado!"}
                ]})
            }

        } else {
            res.render("login", {errors: errors.errors})
        }

    },

    logOut : function(req,res){
       
        req.session.destroy()

        if (req.cookies.Recordame) {
            res.clearCookie("Recordame");
        }

        res.redirect("/")
    }

}