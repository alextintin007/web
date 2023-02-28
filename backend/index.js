'use strict'
var mongoose=require('mongoose');
var port='3600';
mongoose.promise=global.Promise;
mongoose.set("strictQuery",false);
var app=require('./app');

mongoose.connect('mongodb://localhost:27017/libros')
.then(()=>{
    console.log("Conexion establecida con la bdd");
    app.listen(port,()=>{
        console.log("Conexion establecida en el url: localhost:3600");
    })
})
.catch(err=>console.log(err))