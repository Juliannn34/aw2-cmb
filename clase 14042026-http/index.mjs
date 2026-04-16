// Modulo HTTP
import http from 'node:http'
import fsp from 'node:fs/promises'
import path from 'node:path'

// Creamos una instacia de servidor
const app = http.createServer(async(peticion, respuesta)=>{
    // console.log(peticion) //<--- Viene del CLiente

    if(peticion.method === 'GET'){

        if(peticion.url === '/'){
            //Antes del END todo. Despues nada
            respuesta.statusCode = 200
            return respuesta.end(`
                ruta raiz /
        
            `)//<--- 
    
        }
        if(peticion.url === '/usuarios'){
            //Antes del END todo. Despues nada
            respuesta.statusCode = 200
            return respuesta.end(`
                ruta usuarios /usuarios
        
            `)//<--- 
    
        }
    }
    
    if(peticion.method === 'POST'){
        if(peticion.url === '/'){
            const ruta = path.join('./contenido.txt')
            await fsp.writeFile(ruta, 'Contenido falso')
            return respuesta.end('Recurso Creado')
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

