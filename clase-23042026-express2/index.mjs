//Express ---> Framework de JavaScrip para crear servidores
import express from 'express'

const puerto = 3000

//Instancia de Servidor
const app = express()

//Expresss ---> chequear datos del cliente --> cuerpo (configuracion)

app.use(express.urlencoded({extended:true}))
app.use(express.json())


//-------------------------------------------
const productos = [
    {
        id: 1,
        nombre: 'Teclado',
        rubro: 'Computaion',
        precio: 2000,
    },
    {   
        id: 2,
        nombre: 'Remera',
        rubro: 'ropa',
        precio: 1200,
    }
]
//-------------------------------------------



const obtenerRaiz = (req, res) => {
    res.status(200)
    res.end('Hola Mundo')
}

app.get('/', obtenerRaiz)

app.get('/usuarios', (req, res) => {

    const miObjeto = {  //Objeto JSON Manipulable
        materia: 'AW2',
    }

    res.status = 200
    res.json(miObjeto)
})



app.get('/productos',(req, res) => {

    res.json(productos)

})

app.get('/productos/:id', (req, res) => {

    const id = parseInt(req.params.id)
    console.log(id)

    //Filtrar

    const IdFiltrados = productos.filter((p) =>{
        return(p.id === id)
    })

    if(IdFiltrados.length > 0) {
        res.json(IdFiltrados)
    }
    res.json({"mensaje":"producto no encontrado"})
})

//----------------------------------------------------------------

//Ejemplo con  rubros
app.get('/productos/rubros/:rubro', (req, res) => {

    const rubro = req.params.rubro
    console.log(rubro)

    const productos = [
        {
            id: 1,
            nombre: 'Teclado',
            rubro: 'Computacion',
            precio: 2000,
        },
        {   
            id: 2,
            nombre: 'Remera',
            rubro: 'ropa',
            precio: 1200,
        }
    ]
    
    //Filtrar

    const RubroFiltrados = productos.filter((p) => {
        return(p.rubro === rubro)
    })

    res.json(RubroFiltrados)
})

//----------------------------------------------------------------

//Envio datos al servidor

app.post('/productos',(req, res) =>{
    //Verificamos el cuerpo del mesaje 
    const datosClientes= req.body;
    productos.push(datosClientes)
    res.status(201).json({mensaje: "Producto dado de alta"})
})


//iniciar servidor
app.listen(puerto, () => {
    console.log(`http:///localhost:${puerto}`)
})
