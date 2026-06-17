/*
Capa encargada de los datos.
En este caso los libros están guardados en un archivo Libros.json
*/

import fsp from 'node:fs/promises'
import path from 'node:path'

// Construye la ruta hacia el archivo Libros.json
const rutaArchivo = path.join(process.cwd(), 'data', 'Libros.json')

// Lee el archivo y devuelve todos los libros como array de objetos
export async function obtenerTodos() {
    const contenido = await fsp.readFile(rutaArchivo, 'utf-8')
    return JSON.parse(contenido)
}

// Devuelve el libro cuyo id coincide con el recibido, dentro de un array
// (array vacío si no se encuentra ninguno)
export async function obtenerUno(id) {
    const id_libro = Number(id)
    const libros = await obtenerTodos()

    const librosFiltrados = libros.filter((libro) => {
        return Number(libro.id) === id_libro
    })

    return librosFiltrados
}

// Filtra los libros por género recibido
export async function obtenerPorGenero(genero) {
    const libros = await obtenerTodos()

    const librosFiltrados = libros.filter((libro) => {
        return libro.genero === genero
    })

    return librosFiltrados
}