import express from 'express'

const PUERTO = 3000

const app = express()

function middleware1(req, res, next){
    console.log('middleware1')
    next()
}

app.use(middleware1)


app.get('/', (req, res) =>{
    console.log('Respuesta Final')
    res.end('HOLA MUNDO')
})

app.get('/saludo', (req, res) =>{
    console.log('Respuesta Final')
    res.end('HOLA SALUDO')
})

app.get('/saludo/dedia', (req, res) =>{
    console.log('Respuesta Final')
    res.end('HOLA SALUDO DE  DIA')
})


app.listen(PUERTO, () =>{
    console.log(`http://localhost:${PUERTO}`)
})