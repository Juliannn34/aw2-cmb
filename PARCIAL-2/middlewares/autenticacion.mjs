import jwt from 'jsonwebtoken'
import * as modelo from '../modulos/usuarios/modelo-usuarios.mjs'
import * as vista from '../modulos/usuarios/vista-usuarios.mjs'

// Verifica que exista una sesión válida antes de continuar.
// Bloquea el acceso si no hay cookie, el token es inválido/expiró,
// o ya no coincide con session_id en la base (por ejemplo, tras un logout).
export async function verificarAutenticacion(req, res, next) {

    // req.signedCookies contiene las cookies firmadas (gracias a cookie-parser)
    const token = req.signedCookies?.token

    // si no hay cookie, no hay sesión activa
    if (!token) {
        return responderNoAutorizado(req, res)
    }

    // jwt.verify comprueba la firma (con JWT_FIRMA) y que no haya expirado
    jwt.verify(token, process.env.JWT_FIRMA, async (error, decoded) => {
        if (error) {
            // token inválido o expirado
            return responderNoAutorizado(req, res)
        }

        try {
            // verificamos que ese token siga vigente en la base de datos
            // (si el usuario cerró sesión, session_id sería NULL)
            const resultado = await modelo.buscarPorSessionId(token)
            const usuario = vista.buscarPorSessionId(resultado)

            if (!usuario) {
                return responderNoAutorizado(req, res)
            }

            // guardamos el username en req para usarlo en los controladores
            req.usuario = decoded.usuario

            next()
        } catch (error) {
            // error de conexión con la base de datos
            console.log(error)
            return res.status(500).json({
                mensaje: 'Error al verificar la sesión',
                status: 500
            })
        }
    })
}

// Responde distinto según si la petición es a la API (JSON) o a una página (HTML)
function responderNoAutorizado(req, res) {
    // si la petición acepta HTML, redirigimos al login
    if (req.headers.accept && req.headers.accept.includes('text/html')) {
        return res.redirect('/login.html')
    }

    // si es una petición a la API, respondemos con 401
    return res.status(401).json({
        mensaje: 'No autorizado. Iniciá sesión para continuar.',
        status: 401
    })
}