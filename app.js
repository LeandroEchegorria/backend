var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require ('express-session');


require('dotenv').config(); //config es un metodo para levantar la BD,desde .env y bd.js


var pool = require('./models/bd')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var nosotrosRouter= require('./routes/nosotros');
var serviciosRouter= require('./routes/servicios');
var contactoRouter= require('./routes/contacto');

var loginRouter=require('./routes/admin/login');
var adminRouter=require('./routes/admin/novedades');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//poner aca la session, antes que cargue las rutas
app.use(session({
  secret: 'leandro12345',
  resave: false,
  saveUninitialized:true
}));

secured = async (req,res,next) => {
  try{
    console.log(req.session.id_usuario);
    if(req.session.id_usuario){
      next(); //esto "autoriza" a que pase al siguiente
    } else {
        res.redirect('/admin/login');
    }
  } catch(error){
    console.log(error);
  }
}


//app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/nosotros', nosotrosRouter);
app.use('/servicios', serviciosRouter);
app.use('/contacto', contactoRouter);

app.use('/admin/login', loginRouter);
app.use('/admin/novedades',secured, adminRouter);


//SELECT
pool.query('select * from empleados').then (function (resultados){
  console.log(resultados)
});
//FIN SELECT

//INSERT
//var obj ={
 // nombre: 'Juan',
 // apellido: 'Lopez',
 // trabajo: 'docente',
 // edad: 38,
 // salario: 15000,
 // mail: 'juanlopez@gmail.com'
//}
//pool.query('insert into empleados set ?', [obj]).then(function(resultados){
  //console.log(resultados)
//});
//FIN INSERT



app.get('/', function(req , res){
  var conocido= Boolean(req.session.nombre);

  res.render('index', {
    title: 'Sesiones en Express.js',
    conocido: conocido,
    nombre: req.session.nombre
  });
});

app.post('/ingresar', function(req,res){
  if (req.body.nombre){
    req.session.nombre= req.body.nombre
  }
  res.redirect('/');
});

app.get('/salir', function(req,res){
  req.session.destroy();
  res.redirect('/');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
