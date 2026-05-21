import pg from '../../conexion-bd.mjs'


/*
Capa encargada de los datos.
Por ejemplo, consultas a una base de datos local o externa
*/

export async function obtenerTodos(){
    const resultado = await pg.query('SELECT * FROM productos')//<-- me devuelve un objeto Result 
    // console.log(resultado.rows)
    return resultado//<-- como se entregan lo datos

}






export async function obtenerUno(id){
    const id_producto = Number(id)
    const resultado = await pg.query('SELECT * FROM productos WHERE id=$1',[id_producto])
    return resultado

}

export async function eliminarUno(id){

    const id_producto = Number(id)
    const resultado = await pg.query('DELETE FROM productos WHERE id=$1',[id_producto])
    return resultado

}

