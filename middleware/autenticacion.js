const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    const token = req.headers['authorization'];
    
    if (!token) {
        return res.status(401).send({message: 'Acceso denegado. No se proporcionó un token.'});
    }

    const tokenParts = token.split(' ')[1];

    jwt.verify(tokenParts, 'secret', (err, decoded) => {
        if (err) return res.status(401).send({message: 'Token inválido.'});
        req.usuario = decoded;
        next();
    });
}

module.exports = verificarToken;
