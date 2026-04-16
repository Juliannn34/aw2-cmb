import http from 'node:http'
import fsp from 'node:fs/promises'
import path from 'node:path'

try{
    //extraer datos de una api
    const respuesta = await fetch("https://api.escuelajs.co/api/v1/users")
    //convertir los datos de la api a un arreglo .json
    const usuarios = await respuesta.json()

    //construir la ruta donde se guradaria el arreglo
    const ruta = path.join("usuarios.json")

    const datosGuardar = JSON.stringify(usuarios, null, 3)

    await fsp.writeFile(ruta,datosGuardar)
    

}
catch(e){
    console.log(e)
}

const app = http.createServer(async(peticion, respuesta)=>{

    if(peticion.method === 'GET'){

        if(peticion.url === '/usuarios'){
            //Antes del END todo. Despues nada
            respuesta.statusCode = 200
            try {
                const ruta = path.join('usuarios.json')
                const contenido = await fsp.readFile(ruta, 'utf-8')

                return respuesta.end(contenido)
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

// Abrios puerto
app.listen(3000,()=>{
    console.log(`Servidor escuchando em http://localhost:3000`)
})