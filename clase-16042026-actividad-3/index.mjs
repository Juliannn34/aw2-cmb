import http from 'node:http'
import { obtenerUsuariosAPI } from './fechUsuarios.mjs'
import { guardarUsuarios} from './archivos.mjs'
import { leerUsuarios } from './archivos.mjs'

// Inicializar (ANTES estaba inline)
async function inicializarDatos() {
    try {
        const usuarios = await obtenerUsuariosAPI()
        await guardarUsuarios(usuarios)
    } catch (e) {
        console.log(e)
    }
}

await inicializarDatos()


const app = http.createServer(async (peticion, respuesta) => {

    if (peticion.method === 'GET') {

        if (peticion.url === '/usuarios') {
            respuesta.statusCode = 200

            try {
                const usuarios = await leerUsuarios()
                return respuesta.end(JSON.stringify(usuarios, null, 3))
            } catch (e) {
                console.log(e)
                respuesta.statusCode = 500
                return respuesta.end('Error al leer el archivo')
            }
        }

        
        if (peticion.url === '/usuarios/filtrados') {
            respuesta.statusCode = 200

            try {
                const usuarios = await leerUsuarios()
                const filtrados = usuarios.filter(filtro => filtro.id < 10)
                return respuesta.end(JSON.stringify(filtrados, null, 3))
            } catch (e) {
                console.log(e)
                respuesta.statusCode = 500
                return respuesta.end('Error al leer el archivo')
            }
        }
    }

    //Fallblack
    respuesta.statusCode = 404
    return respuesta.end('No se encontro la ruta.')
})

// Abrimos puerto
app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000')
})

