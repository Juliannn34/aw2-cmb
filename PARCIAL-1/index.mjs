import express from 'express'

import { obtenerLibros, obtenerLibrosID, obtenerLibrosPorGenero } from './funciones.mjs'

import { middlewareValidarID } from './middleware.mjs'

const PUERTO = 3000

const app = express()

app.use(express.json())//<-- avisa a express que apase los datos del cuerpo del mensaje http 


//Definiendo una API REST

// GET /api/v1/libros --> Todos

app.get('/api/v1/libros', obtenerLibros)

// GET /api/v1/libros/:id --> por su id

app.get('/api/v1/libros/:id', middlewareValidarID, obtenerLibrosID)

//GET de procedimiento para buscar por gener y promedio de puntaje - No respeta los principios del REST

app.get('/filtrarPorGenero/:genero', obtenerLibrosPorGenero)

app.listen(PUERTO)