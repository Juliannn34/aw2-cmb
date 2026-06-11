// Token de acceso TID AW2 p.366

import express from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import pool from './conexion.bd.mjs';

//Para inyectar las variables de entorno al proceso
// dotenv.config();

const PUERTO = process.env.PUERTO || 4000;

const app = express();

//Ambos me middlewares 
app.use(express.json());//<-- formato JSON
app.use(express.urlencoded({extended: true}))//<-- formato urlencode

//-> lee la cabecera de las cookies -> crea un objeto "cookies" que lo tranforma a -> objeto JavaScrip
//-> 
app.use(cookieParser(process.env.COOKIE_FIRMA)); 


app.post('/registrar', async (req, res) => {
    const { usuario, pass } = req.body;
    if (!usuario || !pass) {
        return res.sendStatus(400);
    }
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashingPass = bcrypt.hashSync(pass, salt);
        const resultado = await pool.query(
            'INSERT INTO usuarios (username, password_hash) VALUES ($1, $2)',
            [usuario, hashingPass]
        );
        if (resultado.rowCount > 0) {
            res.redirect('/login'); // Redirigimos al usuario a la página de login
        } else {
            res.sendStatus(500);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


app.post('/autenticar', async (req, res) => {
    const { usuario, pass } = req.body;
    if (!usuario || !pass) {
        return res.sendStatus(400);
    }

    //lo proximo a hacer en el bloque de codigo
    //consultar Base de Datos si es usuario esta registrado. O sea ver si esta registrado
   

    if(true){
        jwt.sign({usuario: 'andres'}, process.env.JWT_FIRMA, {expiresIn: '1h'},(error, token) =>{
            if(error){
                return res.json({mensaje: 'error'})
            }
            //Enviamos cookie
            res.cookie('token', token,{
                secure: true,
                httpOnly: true,
                sameSite: 'lax',
                signed: true
            })
            res.redirect('/admin')
        })
    }
});


//Servir ambos front
//Admin
function verificarAcceso(req, res, next){
    jwt.verify(token, process.env.JWT_FIRMA, function(error, decded){
        if(error){
            return res.redirect('/login')
        }
        next()
    });
}
app.use('/admin',verificarAcceso,express.static('./fronts/front-admin'))
//Login/registro
app.use('/login',express.static('./fronts/front-login'))
app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});
