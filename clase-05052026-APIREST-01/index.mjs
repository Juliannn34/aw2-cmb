import express from 'express'

import {obtenerProductos, obtenerProductosID, obtenerProductosDELETE} from './funciones.mjs'

const PUERTO = 3000

const app = express()


//Definiendo una API REST

// GET /api/v1/productos --> Todos

app.get('/api/v1/productos', obtenerProductos)

// GET /api/v1/productos/:id --> por su id

app.get('/api/v1/productos/:id', obtenerProductosID)

// POST /api/v1/productos --> dar de alta un nuevo producto

// PUT /api/v1/productos/:id --> modificar un registro que ya existe

// DELETE /api/v1/productos/:id --> eliminar 

app.delete('/api/v1/productos/:id', obtenerProductosDELETE)

app.listen(PUERTO)