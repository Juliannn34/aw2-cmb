import express from 'express';
import bcrypt from 'bcryptjs'
import pool from './conexion.bd.mjs'

const PUERTO = 3000

////////////////

////////////////
const app = express();

app.use(express.json())// ---> req.body ---> un ojbeto JS
app.use(express.urlencoded({extended: true}))// ---> req.body ---> un ojbeto JS 

//hacer publicas estas carpetas para acceder desde el navegador
//-> /admin -> peticion (./front/front-admin) 
app.use('/admin',express.static('./front/front-admin'))
//-> /login -> peticione (./front/front-login) 
app.use('/login',express.static('./front/front-login'))

//Configurar rutas login y registro
app.post('/autenticar', (req, res) =>{

})

app.post('/registrar', async (req, res) =>{
    
    //1 - obtengo los datos del formulario 
    // req.body.usuario
    // const pass = req.body.pass
    const {usuario, pass} = req.body 

    //2 - chequear datos
    if(!usuario || !pass){
        return res.status(400).json({mensaje: 'datos incompletos'})
    }
    
    //3 - Hashing
    //Utilizar try catch
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pass, salt)

    const resultado = await pool.query(`INSERT INTO usuarios
        (username, password_hash)
        VALUES($1, $2)
        RETURNING id, username
        `,
        [
            usuario,
            hash
        ]
    )
    //si todo esta OK
    if(resultado.rowCount > 0){
        return res.status(201).json({mensaje: 'usuario registrado', usuario: resultado.rows[0].username})
    }
    //si no esta ok
    res.status(500).json({mensaje: 'no se pudo registrar'})
})



app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});
