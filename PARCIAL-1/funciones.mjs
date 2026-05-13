// se importa la función leerLibros()
import { leerLibros } from './archivos.mjs'
// llamamos a leerLibros() con await y el resultado es el array de libros 
const libros = await leerLibros()

// Devuelve todos los libros de la base de datos
function obtenerLibros(req, res){
    res.json(libros)
}

// Devuelve un libro según el id recibido por parámetro en la URL
// Si no existe devuelve un error 404
function obtenerLibrosID(req, res){
    //Logica Previa
    const id_libro = Number(req.params.id)
    //filtro
    const librosFiltrados = libros.filter((libros)=>{
        return Number(libros.id) === id_libro
    })
    //Verificamos si hay elementos en el arreglo
    if (librosFiltrados.length > 0) {
        const respuesta = {
            datos: librosFiltrados,
            url: 'http://localhost:3000/api/v1/libros/' + id_libro,
            status: 200
        }

        // res.json convierte el objeto JavaScript a formato JSON
        // y lo envía como respuesta al cliente
        return res.json(respuesta)

    } else {
        res.status(404).json({
            mensaje: 'libro no encontrado'
        })
    }
    
}




// Filtra los libros por género recibido por parámetro en la URL
// Calcula además el promedio de puntaje de los libros encontrados
function obtenerLibrosPorGenero(req, res){

    const genero = req.params.genero

    // "filter" recorre el array libros y devuelve un NUEVO array
    // solo con los libros cuyo genero coincida con el parametro recibido
    const librosFiltrados = libros.filter((libro) => {
        return libro.genero === genero
    })

    // forEach recorre el array y acumula la suma de todos los puntajes
    let sumaPuntajes = 0

    librosFiltrados.forEach((libro) => {
        sumaPuntajes = sumaPuntajes + libro.puntaje
    })

    // divide la suma total por la cantidad de libros para obtener el promedio
    const promedio = sumaPuntajes / librosFiltrados.length


    if (librosFiltrados.length > 0) {
        const respuesta = {
            datos: librosFiltrados,
            cantidadLibros: librosFiltrados.length,
            // "toFixed(2)" redondea el numero a 2 decimales y lo convierte en string
            // ejemplo: 93.6666666 --> "93.67"
            promedioPuntaje: promedio.toFixed(2),
            url: 'http://localhost:3000/filtrarPorGenero/' + genero,
            status: 200
        }
        
        return res.json(respuesta)

    } else {
        res.status(404).json({
            mensaje: 'No se encontraron libros con ese género',
            status: 404
        })
    }

}

export {obtenerLibros, obtenerLibrosID, obtenerLibrosPorGenero}
