async function obtenerUsuariosAPI() {
    try {
        const respuesta = await fetch("https://api.escuelajs.co/api/v1/users") //leemos la api por FECH luego devuelve un objeto responsive
        const usuarios = await respuesta.json() //obtiene el datos tipo JSON y lo comvierte en un arreglo/array 
        return usuarios
    } catch (e) {
        console.log(e)
    }
}

export {obtenerUsuariosAPI}