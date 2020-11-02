let users = require("../data/usuarios.json");

function recordameMiddleware(req,res,next){
    
    if(req.cookies.Recordame && req.session.usuarioLogueado == undefined ){

        let usuarioBuscado = users.find(function(user){
                
            return user.email == req.cookies.Recordame
        });
        
        req.session.usuarioLogueado = usuarioBuscado
        
    }
    
    next();
}

module.exports = recordameMiddleware;