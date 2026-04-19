import fsp from 'node:fs/promises'
import path from 'node:path'

//construir la ruta donde se guradaria el arreglo
async function guardarUsuarios(usuarios) {
    try {
        const ruta = path.join("usuarios.json")
        const datosGuardar = JSON.stringify(usuarios, null, 3)
        await fsp.writeFile(ruta, datosGuardar)
    } catch (e) {
        console.log(e)
    }
}

// Leer
async function leerUsuarios() {
    try {
        const ruta = path.join("usuarios.json")
        const contenido = await fsp.readFile(ruta, 'utf-8')
        return JSON.parse(contenido)
    } catch (e) {
        console.log(e)
    }
}

export {guardarUsuarios}
export {leerUsuarios}

