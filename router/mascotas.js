const express = require ('express')
const router = express.Router()

const Mascota = require ('../models/mascota')

// lectura de mascotas de forma estatica
// router.get ('/', (req, res) => {
    // res.render ('mascotas', 
    // {arrayMascotas: [
    //     {id: 'xd', nombre: 'luli', descripcion: 'lulita'}
    // ]})
// })

// lectura de mascotas de forma dinamica (MongoDB)
router.get ('/', async (req, res) => {
    try{
        const arrayMascotas = await Mascota.find()
        console.log (arrayMascotas)
        res.render('mascotas', {
            arrayMascotas
        })
        
    }catch(error){
        console.log(error)
    }
})

router.get ('/crear', (req,res) => {
    res.render ('crear')
})

router.post('/', async (req, res) => {
    //obtener el body
    const body= req.body
    try{
        //forma 1 
        // const mascotaDB = new Mascota (body)
        // await mascotaDB.save()

        //forma 2
        await Mascota.create(body)
        res.redirect('/mascotas')
    }catch(error){
        console.log(error)
    }
})

router.get ('/:id', async (req, res) => {
    const id= req.params.id
    try{
        //buscar por id
        const mascotaDB = await Mascota.findById(id)
        //buscar uno por id
        // const mascotaDB = await Mascota.findOne({_id:id})
        console.log(mascotaDB)
        res.render('detalle', {
            mascota: mascotaDB,
            error: false
        })
    }catch(error){
        console.log(error)
        res.render('detalle', {
            error: true,
            mensaje: 'no esta el documento'
        })
    }
})

router.delete('/:id', async (req,res) => {
    const id = req.params.id
    try{
        const mascotaDB = await Mascota.findByIdAndDelete(id)
        if(mascotaDB){
            res.json ({
                estado: true,
                mensaje: 'eliminado'
            })
        }else{
            res.json ({
                estado: false,
                mensaje: 'no se puede eliminar'
            })
        }
    }catch(error){
        console.log(error)
    }
})

router.put ('/:id', async (req,res) => {
    const id = req.params.id
    const body = req.body
    try{
        const mascotaDB = await Mascota.findByIdAndUpdate(id, body, { useFindAndModify: false })
        res.json({
            estado: true,
            mensaje: 'Mascota editada'
        })
    }catch(error){
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Mascota no pudo ser editada'
        })
    }
})


module.exports = router