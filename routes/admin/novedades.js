var express = require ('express');
var router = express.Router();


router.get('/', function (req,res,next){
    res.render('admin/novedades',{
        layout:'admin/layout',
        usuario: req.session.nombre //para pasar el nombre para mostrar al iniciar sesion
    });
});
module.exports =router;