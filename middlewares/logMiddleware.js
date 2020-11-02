function logMiddleware (req, res, next){


    let usuario
    usuario = req.session.usuarioLogueado;

    res.locals.usuarioLogueado = usuario;


    next()
}
module.exports = logMiddleware