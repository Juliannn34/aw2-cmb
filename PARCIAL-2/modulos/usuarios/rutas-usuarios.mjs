import { Router } from 'express'
import * as controlador from './controlador-usuarios.mjs'
import { verificarAutenticacion } from '../../middlewares/autenticacion.mjs'

const rutasUsuarios = new Router()

// POST /login --> verifica credenciales y crea la sesión
rutasUsuarios.post('/login', controlador.iniciarSesion)

// POST /cerrar-sesion --> elimina la sesión activa
// requiere estar autenticado para saber qué usuario está cerrando sesión
rutasUsuarios.post('/cerrar-sesion', verificarAutenticacion, controlador.cerrarSesion)

export default rutasUsuarios