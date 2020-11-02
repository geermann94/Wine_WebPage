const express = require('express');
const router = express.Router();

let {check,validationResult,body} = require("express-validator");

const productController = require('../controllers/productController');

const authMiddleware = require("../middlewares/authMiddleware")


router.get('/detail/:id/:category', productController.detalle);
router.get("/all", productController.allProducts)
router.get('/',authMiddleware, productController.listar);
router.get('/detail/:id',authMiddleware, productController.detalleInterno);
router.get('/edit/:id',authMiddleware, productController.edit);

router.post('/edit/:id',authMiddleware,[
    check("Descripcion").isLength({min: 1}).withMessage("El campo Descripcion debe estar completo"),
    check("Precio").isNumeric().withMessage("Debe colocar un precio numerico"),
    check("Descuento").isNumeric().withMessage("Debe colocar un desceunto numerico, aunque sea cero"),
], productController.store);

router.get('/delete/:id',authMiddleware, productController.delete);
router.get('/crear',authMiddleware, productController.crearGet);

router.post('/crear',authMiddleware,[
    check("ID").isNumeric().withMessage("El campo ID debe ser un numero"),
    check("Nombre").isLength({min: 1}).withMessage("El campo Nombre debe estar completo"),
    check("Descripcion").isLength({min: 1}).withMessage("El campo Descripcion debe estar completo"),
    check("Precio").isNumeric().withMessage("Debe colocar un precio numerico"),
    check("Descuento").isNumeric().withMessage("Debe colocar un desceunto numerico, aunque sea cero"),

    body("ID").custom(function(value){

        let products = require("../data/productsDataBase.json");
        let checkID = products.filter(function(product){

            return product.id == value
        })

        if(checkID.length != 0 ){
            return false
        } else{
            return true
        } 
    }).withMessage("el ID ya esta en uso!")

], productController.crearPost);

module.exports = router;