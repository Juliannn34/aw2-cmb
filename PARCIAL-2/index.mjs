import express from 'express'
// cookie-parser: middleware que lee las cookies que llegan en cada petición y las pone disponibles en req.cookies (normales) y req.signedCookies (firmadas)
import cookieParser from 'cookie-parser'
// dotenv: permite cargar variables de entorno desde el archivo .envhacia process.env
import dotenv from 'dotenv'
import path from 'node:path'
// rutasLibros: Router de Express con los endpoints /api/v1/libros y /filtrarPorGenero
import rutasLibros from './modulos/libros/rutas-libros.mjs'
// rutasUsuarios: Router de Express con los endpoints /login y /cerrar-sesion
import rutasUsuarios from './modulos/usuarios/rutas-usuarios.mjs'
// verificarAutenticacion: middleware que bloquea el acceso si no hay sesión válida
import { verificarAutenticacion } from './middlewares/autenticacion.mjs'

// Carga el contenido del archivo .env y lo inyecta en process.env
dotenv.config()

const PUERTO = process.env.PUERTO || 3000

const app = express()

// parsea el texto del cuerpo y lo convierte en un objeto JavaScript
app.use(express.json())
// Hace lo mismo que express.json() pero para datos enviados como formularios HTML tradicionales 
app.use(express.urlencoded({ extended: true }))
// Pasarle process.env.COOKIE_FIRMA como argumento activa el modo "firmado"
app.use(cookieParser(process.env.COOKIE_FIRMA))
// process.cwd() devuelve la ruta absoluta de la carpeta raíz del proyecto
// path.join(...) concatena las partes de la ruta
app.use('/css', express.static(path.join(process.cwd(), './fronts/css')))

// res.sendFile lee un archivo del disco y lo envía completo como respuesta, detectando automáticamente el tipo de contenido 
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(process.cwd(), './fronts/login/login.html'))
})

// verificarAutenticacion: se ejecuta primero. Si no hay sesión válida, responde con un redirect o un error 401 y NUNCA llama a next().
// la función que envía el archivo: solo se ejecuta si el middlewar anterior llamó a next(), es decir, si la sesión es válida.
app.get('/items.html', verificarAutenticacion, (req, res) => {
    res.sendFile(path.join(process.cwd(), './fronts/items/items.html'))
})

app.get('/item.html', verificarAutenticacion, (req, res) => {
    res.sendFile(path.join(process.cwd(), './fronts/items/item.html'))
})

app.get('/procedimiento.html', verificarAutenticacion, (req, res) => {
    res.sendFile(path.join(process.cwd(), './fronts/procedimiento/procedimiento.html'))
})

// Si un usuario escribe la URL sin ".html" estas rutas capturan esa petición y la redirigen a la versión real con extensión
app.get('/login', (req, res) => res.redirect('/login.html'))
app.get('/items', (req, res) => res.redirect('/items.html'))
app.get('/item', (req, res) => res.redirect('/item.html'))
app.get('/procedimiento', (req, res) => res.redirect('/procedimiento.html'))

// Cuando alguien entra a http://localhost:3000 sin ninguna ruta específica,
// lo mandamos directamente a la página de login.
app.get('/', (req, res) => {
    res.redirect('/login.html')
})

// rutasLibros ya es un Router con sus propias rutas completas definidas internamente (/api/v1/libros, /api/v1/libros/:id, /filtrarPorGenero/:genero).
app.use(rutasLibros)
// monta las rutas /login y /cerrar-sesion definidas dentro de rutas-usuarios.mjs
app.use(rutasUsuarios)

app.use((req, res) => {
    res.status(404).json({
        mensaje: 'La ruta solicitada no existe',
        status: 404
    })
})

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`)
})