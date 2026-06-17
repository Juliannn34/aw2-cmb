/*
Capa encargada de darle forma a la respuesta que recibe el cliente.
Sigue el mismo formato { datos, url, status } usado en toda la API.
*/

// Da forma a la respuesta del endpoint "todos los libros"
export function obtenerTodos(libros) {
    return {
        datos: libros,
        total: libros.length,
        url: 'http://localhost:3000/api/v1/libros',
        status: 200
    }
}

// Da forma a la respuesta del endpoint "un libro por id"
export function obtenerUno(libro, id) {
    return {
        datos: libro,
        url: 'http://localhost:3000/api/v1/libros/' + id,
        status: 200
    }
}

// Da forma a la respuesta del endpoint de procedimiento "filtrar por género"
export function obtenerPorGenero(librosFiltrados, genero, promedio) {
    return {
        datos: librosFiltrados,
        cantidadLibros: librosFiltrados.length,
        promedioPuntaje: promedio.toFixed(2),
        url: 'http://localhost:3000/filtrarPorGenero/' + genero,
        status: 200
    }
}