import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import * as modelo from './modelo-usuarios.mjs'
import * as vista from './vista-usuarios.mjs'

// POST /login
// Recibe { usuario, pass } y verifica las credenciales contra la base de datos
export async function iniciarSesion(req, res) {
    // req.body ya viene parseado gracias a express.json()
    const { usuario, pass } = req.body

    // validamos que llegaron ambos campos
    if (!usuario || !pass) {
        return res.status(400).json({
            mensaje: 'Usuario y contraseña son obligatorios',
            status: 400
        })
    }

    try {
        // obtenemos de la capa modelo el usuario buscado por username
        const resultado = await modelo.buscarPorUsername(usuario)
        const usuarioEncontrado = vista.buscarPorUsername(resultado)

        // si no existe el usuario, respondemos con error genérico
        // (no decimos "usuario no existe" para no dar pistas a un atacante)
        if (!usuarioEncontrado) {
            return res.status(401).json({
                mensaje: 'Usuario o contraseña incorrectos',
                status: 401
            })
        }

        // bcrypt.compareSync vuelve a aplicar el hashing a "pass" y compara
        // el resultado contra el hash guardado en la base. Nunca se "desencripta"
        // el hash, solo se compara si ambos coinciden.
        const passwordCorrecta = bcrypt.compareSync(pass, usuarioEncontrado.password_hash)

        if (!passwordCorrecta) {
            return res.status(401).json({
                mensaje: 'Usuario o contraseña incorrectos',
                status: 401
            })
        }

        // jwt.sign(...) genera el token.
        // expiresIn hace que el token deje de ser válido después de 1 hora.
        jwt.sign(
            { usuario: usuarioEncontrado.username },
            process.env.JWT_FIRMA,
            { expiresIn: '1h' },
            async (error, token) => {
                if (error) {
                    return res.status(500).json({
                        mensaje: 'Error al generar el token',
                        status: 500
                    })
                }

                try {
                    // guardamos el token en la base de datos (columna session_id)
                    // esto permite invalidar la sesión al cerrar sesión
                    await modelo.guardarSessionId(usuarioEncontrado.username, token)

                    // res.cookie manda el token al navegador.
                    // httpOnly: JS del navegador no puede leerla
                    // sameSite: protege contra ataques CSRF
                    // signed: la cookie se firma con COOKIE_FIRMA para detectar alteraciones
                    res.cookie('token', token, {
                        httpOnly: true,
                        sameSite: 'lax',
                        signed: true,
                        maxAge: 60 * 60 * 1000 // 1 hora en milisegundos
                    })

                    res.status(200).json({
                        mensaje: 'Inicio de sesión exitoso',
                        status: 200
                    })
                } catch (error) {
                    console.log(error)
                    res.status(500).json({
                        mensaje: 'Error al iniciar sesión',
                        status: 500
                    })
                }
            }
        )
    } catch (error) {
        // error de conexión con la base de datos u otro error inesperado
        console.log(error)
        res.status(500).json({
            mensaje: 'Error al conectar con la base de datos',
            status: 500
        })
    }
}

// POST /cerrar-sesion
// Elimina el session_id del usuario en la base y borra la cookie del navegador
export async function cerrarSesion(req, res) {
    // req.usuario fue agregado por el middleware de autenticación
    const usuario = req.usuario

    try {
        if (usuario) {
            await modelo.eliminarSessionId(usuario)
        }

        // le dice al navegador que elimine la cookie "token"
        res.clearCookie('token')

        res.status(200).json({
            mensaje: 'Sesión cerrada correctamente',
            status: 200
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            mensaje: 'Error al cerrar sesión',
            status: 500
        })
    }
}