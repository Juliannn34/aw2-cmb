import pool from '../../conexion_bd.mjs'

// Busca un usuario por su nombre de usuario
// Devuelve el objeto Result completo (con .rows)
export async function buscarPorUsername(username) {
    const resultado = await pool.query(
        'SELECT * FROM usuarios WHERE username = $1',
        [username]
    )
    return resultado
}

// Guarda el token de sesión (JWT) del usuario en la columna session_id
export async function guardarSessionId(username, sessionId) {
    const resultado = await pool.query(
        'UPDATE usuarios SET session_id = $1 WHERE username = $2',
        [sessionId, username]
    )
    return resultado
}

// Busca un usuario por su session_id (usado para validar el token en cada petición)
export async function buscarPorSessionId(sessionId) {
    const resultado = await pool.query(
        'SELECT * FROM usuarios WHERE session_id = $1',
        [sessionId]
    )
    return resultado
}

// Elimina el session_id del usuario (cierre de sesión)
export async function eliminarSessionId(username) {
    // pone session_id en NULL, invalidando esa sesión aunque el JWT
    // todavía no haya expirado
    const resultado = await pool.query(
        'UPDATE usuarios SET session_id = NULL WHERE username = $1',
        [username]
    )
    return resultado
}