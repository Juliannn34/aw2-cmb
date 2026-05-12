/*
Capa encargada de los datos.
Por ejemplo, consultas a una base de datos local o externa
*/

import productos from '../../productos.mjs'

export function obtenerTodos(){

    /*
    Si tomamos los datos de un archivo JSON
    aqui estaria el readfile
    */
    return productos

}

export function obtenerUno(id){
    const id_producto = Number(id)

    const productosFiltrados = productos.datos.filter((producto)=>{
       return Number(producto.id) === id_producto
    })
    //Arreglos
    return productosFiltrados

}

export function eliminarUno(id){

    id_producto = Number(id)

    const cantidadItemArreglo = productos.datos.length
    productos.datos.forEach((producto, indice)=>{
        if(Number(producto.id) === id_producto){
            //Elimina un elemento del arreglo
            producto.datos.splice(indice,1)
        }
    })


    if (cantidadItemArreglo > productos.datos.length) {
        return true
    } else {
        return false
    }

}

