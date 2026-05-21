//import express from 'express'
import {Router} from 'express'
import * as controlador from './controlador-productos.mjs'

//Instanciamos
const rutasProductos = new Router()

//obtener todos los productos
rutasProductos.get('/api/v1/productos', controlador.obtenerTodos)
//obtener un producto por id
rutasProductos.get('/api/v1/productos/:id', controlador.obtenerUno)
//eliminar prodrunto por id
rutasProductos.delete('/api/v1/productos/:id', controlador.eliminarUno)

export default rutasProductos