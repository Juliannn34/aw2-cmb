// Extrae las filas del objeto Result que devuelve pg.query

export function buscarPorUsername(resultado) {
    // resultado.rows es un array de filas encontradas;
    // tomamos la primera (username es único, así que hay como máximo una)
    return resultado.rows[0]
}

export function buscarPorSessionId(resultado) {
    return resultado.rows[0]
}