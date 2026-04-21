//Express ---> Framework de JavaScrip para crear servidores
import express from 'express'

const puerto = 3000

//Instancia de Servidor
const app = express()

//Verbo y Ruta configurada -> GET "/" <-- Ruta
app.get('/',(req,res)=>{
    res.status(200)
    res.send('HOLA SOY JULI')
})

app.get('/usuarios',(req,res)=>{
    res.status(200)
    res.set('Content-type','text/html')
    res.send('<h1>Hola expressJS en /usuarios</h1>')
})

app.post('/',(req,res)=>{
    res.status(201)
    res.send('Hola POST en /')
})


//Abrir Puerto para escuchar peticiones
app.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`)
})

