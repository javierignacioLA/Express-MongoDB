// import mongoose from 'mongoose';
// const { Schema } = mongoose;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//crear schema
const mascotaSchema = new Schema ({
    nombre: String,
    descripcion: String
}, {collection: 'mascotas'})

//crear modelo
const Mascota = mongoose.model ('Mascota', mascotaSchema)

//exportar modelo
module.exports= Mascota;