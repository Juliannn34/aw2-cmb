// Valida que el parámetro :id recibido en la URL sea un número entero positivo
// Si es válido deja pasar la petición al endpoint con next()
// Si no es válido corta la petición y devuelve un error 400
function middlewareValidarID(req, res, next){

    // req.params.id siempre llega como STRING desde la URL
    // Number() lo convierte a número para poder validarlo
    const id = Number(req.params.id)

    // Number.isInteger verifica que sea un número entero (no 1.5 por ejemplo)
    // id > 0 verifica que sea positivo (no 0 ni negativos)
    if (Number.isInteger(id) && id > 0) {
        // si pasa la validación, next() le dice a Express
        // "el middleware terminó, continuá con la función del endpoint"
        return next() 
    } else {
        //si no pasa se responde con mensaje de error
        res.status(400).json({
            mensaje: 'El id debe ser un número entero positivo',
            status: 400
        })
    }
}

export {middlewareValidarID}