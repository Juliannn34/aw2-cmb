import * as modelo from './modelo-libros.mjs'
import * as vista from './vista-libros.mjs'

// GET /api/v1/libros --> devuelve todos los libros
export async function obtenerTodos(req, res) {
    try {
        // obtenemos de la capa modelo los datos
        const libros = await modelo.obtenerTodos()

        // le damos forma a la respuesta con la capa vista
        const resultado = vista.obtenerTodos(libros)

        res.json(resultado)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            mensaje: 'Error al obtener los libros',
            status: 500
        })
    }
}

// GET /api/v1/libros/:id --> devuelve un libro por su id
export async function obtenerUno(req, res) {
    // el id ya viene validado por el middleware validarId
    const id_libro = req.params.id

    try {
        const librosEncontrados = await modelo.obtenerUno(id_libro)

        // verificamos si hay resultados y respondemos en consecuencia
        if (librosEncontrados.length > 0) {
            const resultado = vista.obtenerUno(librosEncontrados, id_libro)
            res.json(resultado)
        } else {
            res.status(404).json({
                mensaje: 'libro no encontrado',
                status: 404
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            mensaje: 'Error al obtener el libro',
            status: 500
        })
    }
}

// GET /filtrarPorGenero/:genero --> endpoint de procedimiento
// No respeta los principios REST porque tiene un verbo en la ruta
export async function obtenerPorGenero(req, res) {
    const genero = req.params.genero

    try {
        const librosFiltrados = await modelo.obtenerPorGenero(genero)

        if (librosFiltrados.length > 0) {
            // forEach recorre el array y acumula la suma de todos los puntajes
            let sumaPuntajes = 0
            librosFiltrados.forEach((libro) => {
                sumaPuntajes = sumaPuntajes + libro.puntaje
            })

            // divide la suma total por la cantidad de libros para obtener el promedio
            const promedio = sumaPuntajes / librosFiltrados.length

            const resultado = vista.obtenerPorGenero(librosFiltrados, genero, promedio)
            res.json(resultado)
        } else {
            res.status(404).json({
                mensaje: 'No se encontraron libros con ese género',
                status: 404
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            mensaje: 'Error al ejecutar el procedimiento',
            status: 500
        })
    }
}