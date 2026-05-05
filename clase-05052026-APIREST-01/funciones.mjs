//BD 
import productos from './productos.mjs'

function obtenerProductos(req, res){
    res.json(productos)
}



function obtenerProductosID(req, res){
    //Logica Previa
    const id_producto = Number(req.params.id)
    //Filtro
    const productosFltrados = productos.filter((productos)=>{
        return Number(productos.id) === id_producto
    })
    //Verificamos si hay elementos en el arreglo
    if(productosFltrados.length > 0){
        const respuesta = {
            datos: productosFltrados,
            url: 'http://localhost:3000/api/v1/productos/' + id_producto,
            status: 200
        }
        return res.json(respuesta)

    }else{
        res.status(404).json({
            mensaje: 'producto no encontrado'
        })
    }
    
}


function obtenerProductosDELETE(req, res){

    //Logica Previa
    const id_producto = Number(req.params.id)
    //Filtro
    const productosFltrados = productos.filter((productos)=>{
        return Number(productos.id) !== id_producto
    })

    //borramos el producto elegido 
    productos.length = 0
    productos.push(productosFltrados)


    //Verificamos si hay elementos en el arreglo
    const respuesta = {
        datos: productosFltrados,
        url: 'http://localhost:3000/api/v1/productos/' + id_producto,
        status: 200,
        verbo: 'DELETE'
    }
    return res.json(respuesta)
}


export {obtenerProductos, obtenerProductosID, obtenerProductosDELETE }