//BD 
import productos from './productos.mjs'

function obtenerProductos(req, res){
    res.json(productos)
}



function obtenerProductosID(req, res){
    //Logica Previa
    const id_producto = Number(req.params.id)
    //Filtro
    const productosFltrados = productos.datos.filter((productos)=>{
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

function ObtenerProductosPOST(req, res){
    //recibo los datos convertidos a JS
    const producto = req.body
    const UltipoId = productos.ultimo_id + 1

    //Genero una estructura para el producto a insertar
    const productoFinal = {
        id: productos.ultimo_id + 1,
        ...producto
    }

    // O

    // producto.id = productos.ultimo_id + 1

    //Tenemos que modificar el ID en la BD --> productos.mjs
    productos.ultimo_id = UltipoId

    //responder
    productos.datos.push(productoFinal)

    res.status(201).json({
        mensaje: 'se dio de alta el producto'
    })
}


function ObtenerProductosPUT(req,res){
    //Necesitamos saber el ID
    const id_producto = Number(req.params.id)
    //Necesitamos  los datos del producto a modificar
    const Nuevoproducto = req.body

    productos.datos.map((producto)=>{
        //necesitamos saber la ubicaciones dentro del arreglo del producto que queremos modificar
        //Necesitamos el indice
        
        if(Number(producto.id) === id_producto){
            const indice = productos.datos.indexOf(producto)
            console.log(productos.datos[indice])
            //Accedo al indice
            productos.datos[indice] = {
                id: id_producto,
                ...Nuevoproducto
            }
            
        }

    })

    res.json({
        mensaje: 'producto modificado correctamente con el id' + id_producto
    })

}


export {obtenerProductos, obtenerProductosID, obtenerProductosDELETE, ObtenerProductosPOST, ObtenerProductosPUT }