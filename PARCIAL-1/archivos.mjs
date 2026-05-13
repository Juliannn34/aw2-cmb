// node:fs/promises permite leer archivos de forma asíncrona
import fsp from 'node:fs/promises'
// node:path permite construir rutas de archivos de forma segura
import path from 'node:path'

// Lee el archivo Libros.json y devuelve el contenido como array de objetos
async function leerLibros() {
    try {
        const ruta = path.join("Libros.json")
        const contenido = await fsp.readFile(ruta, 'utf-8')
        return JSON.parse(contenido)
    } catch (e) {
        console.log(e)
    }
}

export { leerLibros }