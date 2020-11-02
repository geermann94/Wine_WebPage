const fs = require('fs');
let productos = require('../data/productsDataBase.json');

let {check,validationResult,body} = require("express-validator");

module.exports = {

    detalle : function(req, res) {

        let idQueVienePorURL = req.params.id;

        let productoSeleccionado = productos.find( producto => {
            return producto.id == idQueVienePorURL;
        })

        let precioFinal = Math.round(productoSeleccionado.price - (productoSeleccionado.discount * productoSeleccionado.price / 100))

        res.render('detalle', { idProducto : productoSeleccionado, precioFinal});

    },

    listar : function(req, res) {

        res.render('listaProductos', { productos : productos});

    },

    detalleInterno: function(req, res) {

        let idQueVienePorURL = req.params.id;

        let productoSeleccionado = productos.find( producto => {
            return producto.id == idQueVienePorURL;
        })

        let precioFinal = Math.round(productoSeleccionado.price - (productoSeleccionado.discount * productoSeleccionado.price / 100))

        res.render('detalleInterno', { idProducto : productoSeleccionado, precioFinal});

    },

    edit: function(req, res) {

        let idQueVienePorURL = req.params.id;

        let productoSeleccionado = productos.find( producto => {
            return producto.id == idQueVienePorURL;
        })

        let precioFinal = Math.round(productoSeleccionado.price - (productoSeleccionado.discount * productoSeleccionado.price / 100))

        res.render('edit', { idProducto : productoSeleccionado, precioFinal,});

    },



    store: function(req, res) {

        let errors = validationResult(req)

        let idQueVienePorURL = req.params.id;

        let idProducto = productos.find(function(producto) {
            
            return producto.id == idQueVienePorURL
        })

        if(errors.isEmpty()){

            let prodArreglo = productos.map(function(producto) {
            
                if(producto.id == idQueVienePorURL) {
                    
                    producto.description = req.body.Descripcion;
                    producto.price = req.body.Precio;
                    producto.discount = req.body.Descuento;
                    producto.category = req.body.Categoria;
                }
                return producto
            })
  
    
            prodArreglo = JSON.stringify(prodArreglo, null, ' ');

            fs.writeFileSync('./data/productsDataBase.json', prodArreglo);

            res.redirect("/product");

        } else {
            res.render("edit", {errors: errors.errors, idProducto: idProducto})
        }
        
    },


    delete: function(req, res) {

        let idQueVienePorURL = req.params.id;
        
        
        let prodArreglo = productos.filter(function(producto) {
           
        
            return idQueVienePorURL != producto.id
        })
  
    
        prodArreglo = JSON.stringify(prodArreglo, null, ' ');

        fs.writeFileSync('./data/productsDataBase.json', prodArreglo);

        res.redirect("/");

    },

    crearGet: function(req, res) {
      
        res.render('crear');

    },

    crearPost: function(req, res) {

        let errors = validationResult(req)

        if(errors.isEmpty()){

            let productoNuevo = {
                id: req.body.ID,
                name: req.body.Nombre,
                price: req.body.Precio,
                discount: req.body.Descuento,
                category: req.body.Categoria,
                description: req.body.Descripcion,
                image: req.body.Imagen
            };
    
            productos.push(productoNuevo)
    
            productos = JSON.stringify(productos, null, ' ');
    
            fs.writeFileSync('./data/productsDataBase.json', productos);
    
            res.redirect("/");

        } else {
            res.render("crear", {errors: errors.errors})
        }

        

    },

    allProducts: function(req,res){
        
        res.render("productos", {productos: productos})
    }


}