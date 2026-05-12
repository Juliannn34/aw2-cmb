import express from 'express'

import * as controlador from './modulos/productos/controlador-productos.mjs'

const PUERTO = 3000

const app = express()

//obtener todos los productos
app.get('/api/v1/productos', controlador.obtenerTodos)
//obtener un producto por id
app.get('/api/v1/productos/:id', controlador.obtenerUno)
//eliminar prodrunto por id
app.delete('/api/v1/productos/:id', controlador.eliminarUno)

app.listen(PUERTO)