import express from 'express'

const PUERTO = 3000

const app = express()

//Middleware
function middleware1(req, res, next){
    const usuarioExiste = true
    
    // if (usuarioExiste) {
    //     console.log('usuario puede pasar')
    //     next() //Avanzar al siguienbte ----->
    // } else {
    //     console.log('usuario NO existe No puede pasar')
    //     res.send('usuario no registrado')
    // }
    

    if(usuarioExiste){
        return next()


    }else {
        console.log('usuario NO existe No puede pasar')
        res.send('usuario no registrado')
    }
}

app.get('/', middleware1, (req, res) =>{
    console.log('Respuesta Final')
    res.end('HOLA MUNDO')
})



app.listen(PUERTO, () =>{
    console.log(`http://localhost:${PUERTO}`)
})