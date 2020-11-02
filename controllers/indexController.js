
let productos = require('../data/productsDataBase.json');

const indexController = {

    index : function(req, res) {


        let visitados = productos.filter( producto => {
            return producto.category == 'visited'
        } ) 

        let ofertas = productos.filter( producto => {
            return producto.category == 'in-sale'
        } ) 


        res.render('index', {productos, visitados, ofertas})
    }

}

module.exports = indexController;