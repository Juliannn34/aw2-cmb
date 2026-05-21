import * as modelo from './modelo-productos.mjs'
import * as vista from './vista-productos.mjs'

export async function obtenerTodos(req, res){
    //obtenemos de la capa modelo la funcion
    const productos = await modelo.obtenerTodos()
    //En la vista moldeamos la respuesta 
    const resultado = vista.obtenerTodos(productos)

    res.json(resultado)

}

export async function obtenerUno(req, res){
    //id del parametro
    const id_productos = req.params.id
    //Ejecutamos la funcion importada desde modelo
    const productos = await modelo.obtenerUno(id_productos)
    //En la vista moldeamos la respuesta 
    const resultado = vista.obtenerUno(productos)//<--- arreglo
    //verificamos si hay producto, y respondemos en conseciencia 
    if (resultado.length > 0) {
        res.json(resultado)
    } else {
        res.status(404).json({mensaje: 'producto no encontrado'})
    }
   
}

export async function eliminarUno(req, res){
    //Obtenemos de capa modelo la funcion
    //obtenemos el id del parametro
    const id_producto = req.params.id
    const productoEliminado = await modelo.eliminarUno(id_producto)
    //En la vista moldeamos la respuesta 
    

    if (productoEliminado.rowCount > 0) {
        res.json({mensaje: `Producto con id ${id_producto} eliminado`})
    } else {
        res.status(404).json({mensaje: 'no se pudo eliminar el producto'})
    }

    
}