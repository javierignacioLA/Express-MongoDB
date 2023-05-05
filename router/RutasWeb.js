const express = require ('express')
const router = express.Router()

//ruta raiz
router.get ('/', (req,res) =>{
    res.render ('index', {titulo: 'titulo dinamico'})
})
//ruta servicios
router.get ('/servicios', (req,res) => { 
    res.render ('servicios', {tituloServicio: 'Bienvenido a servicios'})
})

module.exports = router