import { Router } from 'express'
import * as controlador from './controlador-libros.mjs'
import { validarId } from '../../middlewares/validarId.mjs'
import { verificarAutenticacion } from '../../middlewares/autenticacion.mjs'

const rutasLibros = new Router()

// GET /api/v1/libros --> todos los libros
// verificarAutenticacion bloquea el acceso si no hay token/cookie válida
rutasLibros.get('/api/v1/libros', verificarAutenticacion, controlador.obtenerTodos)

// GET /api/v1/libros/:id --> un libro por su id
rutasLibros.get('/api/v1/libros/:id', verificarAutenticacion, validarId, controlador.obtenerUno)

// GET /filtrarPorGenero/:genero --> endpoint de procedimiento (no REST)
rutasLibros.get('/filtrarPorGenero/:genero', verificarAutenticacion, controlador.obtenerPorGenero)

export default rutasLibros