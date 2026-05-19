import * as modelo from './modelo-productos.mjs'
import * as vista from './vista-productos.mjs'

export function obtenerTodos(req, res){
    //obtenemos de la capa modelo la funcion
    const productos = modelo.obtenerTodos()
    
    const resultado = vista.obtenerTodos(productos)

    res.json(resultado)

}

export function obtenerUno(req, res){
    //id del parametro
    const id_productos = req.params.id
    //Ejecutamos la funcion importada desde modelo
    const producto = modelo.obtenerUno(id_productos)
    //verificamos si hay producto, y respondemos en conseciencia 
    if (producto.length > 0) {
        res.json(producto)
    } else {
        res.status(404).json({mensaje: 'producto no encontrado'})
    }
   
}

export function eliminarUno(req, res){
    //Obtenemos de capa modelo la funcion
    //obtenemos el id del parametro
    const id_producto = req.params.id
    const productoEliminado = modelo.eliminarUno(id_producto)

    if (productoEliminado) {
        res.json({mensaje: `Producto con id ${id_producto} eliminado`})
    } else {
        res.status(404).json({mensaje: 'no se pudo eliminar el producto'})
    }

    
}