import express from 'express'

const PUERTO = 3000

const app = express()

async function middleware(req, res, next){

    const respuesta = await fetch('http://localhost:4321/usuario')
    const usuario = await respuesta.json()

    const cod = req.params.codigo
    console.log(usuario)

    if (usuario.codigo === parseInt(cod)) {
        // res.json({mensaje: 'El código es correcto' })
        // res.status(200)
        return next()

    } else {
        res.status(400)
        res.json({mensaje: 'El código es incorrecto' })

    }
}


app.get('/:codigo', middleware, (req, res) =>{

    res.json({mensaje: 'El código es correcto' })
    res.status(200)

})


app.listen(PUERTO, () =>{
    console.log(`http://localhost:${PUERTO}`)
})