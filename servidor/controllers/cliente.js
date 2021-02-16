const cliente = require('../models/cliente')

module.exports = app =>{
    app.get('/api/v1/cliente/:cpf?', (req, res)=>{
        cliente.buscar(req, res)
    })
}