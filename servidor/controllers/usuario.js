
module.exports = app =>{
    app.get('/api/v1/usuarios/:username?', (req, res)=>{
        const usuario = require('../models/usuario');
        usuario.consultarUsuario(req.params.username, res);
    })
    app.get('/api/v1/usuarios/id/:id?', (req, res)=>{
        const usuario = require('../models/usuario');
        usuario.consultarId(req.params.id, res);
    })
    app.post('/api/v1/usuarios/psw', (req, res)=>{
        const usuario = require('../models/usuario');
        usuario.verificarSenha(req.body, res);
    })
}
