import jwt from 'jsonwebtoken'


// sign <---- firma el token
//veify <----- verifica la firma dle token

jwt.sign({usuario: 'andres'}, 'largaysupersecreta', {expiresIn: '1h'},(error, token) =>{
    console.log(token)
})
