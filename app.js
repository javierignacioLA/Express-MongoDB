const express = require ('express')
const bodyParser = require('body-parser')
//agregar funcion express en app
const app = express () 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

require('dotenv').config()
const PUERTO = process.env.PORT ||3000;

//conexion a bdd MongoDB
const mongoose = require('mongoose');



const uri = `mongodb+srv://${process.env.USUARIO}:${process.env.PASSWORD}@cluster0.bzfm2gs.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

// forma de bluuweb
//  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//    .then(()=> console.log('conectado a mongodb')) 
//   .catch(e => console.log('error de conexión', e))

//mi forma para conectarse
const conexion = async () => {
    try{
        await mongoose.connect (uri)
        console.log ('estamos conectados pa')
    }catch (error){
        console.log(error)
    }
}
conexion()

//template engine
app.set('view engine', 'ejs')
//configurar ruta de las template engines
app.set('views', __dirname + '/views');

//middleware
app.use (express.static(__dirname + '/public'))

//middleware ruta (raiz, servicios) y mascotas
app.use ('/', require ('./router/RutasWeb'))
app.use('/mascotas', require ('./router/mascotas'))


//middleware 404
// app.use ((req,res,next) => {
//     res.status(404).sendFile(__dirname + '/public/404.html')
// })

// middleware 404 con ejs y render
app.use ((req,res,next) => {
     res.status(404).render('404', {
        titulo: '404',
        descripcion: 'pagina no encontrada'
     })
 })

app.listen (PUERTO, () => {
    console.log ('te escucho pa')
})