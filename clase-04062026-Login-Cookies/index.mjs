import express from 'express'
import cookieParser from 'cookie-parser'

const PUERTO = 3000

const app = express()

app.use(cookieParser('misecreto'))
//Avisamos que debe incluir los datos en el body
app.use(express.json())
//Codificacion de URL
app.use(express.urlencoded({extended:true}))
//Front login
app.use('/login',express.static('./fronts/front-login'))
//Front admin
function chequearAcceso(req, res, next){
    const miIdentificador = req.signedCookies['sesion']
    if(miIdentificador === 'identificador'){
        return next()
    }
    return res.redirect('/login')
}

app.use('/admin',chequearAcceso,express.static('./fronts/front-admin'))

//Ruta autentificacion
app.post('/autentificar', (req,res)=>{
    // Prmero -> verificar las credenciales
    const {usuario, clave} = req.body
    
    if(usuario != 'Julian' || clave != '1234'){
        return res.redirect('/login')
    }
    //Generar cabeceras para gestion de cookies
    //Gestionamos Cookie
    res.cookie('sesion','identificador',{
        secure: true, //https
        httpOnly: true, //no se puede leer desde JavaScrip
        sameSite: 'lax' ,//Como se va a leer la cookie con respecto al dominio 
        signed: true, //Si la cooie se va a firmar o no
        maxAge: 1000 * 10 //<-- en milisegundo
    })
    //Siempre la respuesta final
    // res.json({
    //     mensaje: 'Usuario Logueado'
    // })

    //Lo vamos a usar solo si en el fron es HTML puro
    res.redirect('/admin')
    //si no es puro --> se refiere a utilizr JS para jestionar el
})




app.listen(PUERTO)