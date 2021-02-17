const cliente = require('../models/cliente')

module.exports = app =>{
    app.get('/api/v1/cliente/cpf/:cpf?', (req, res)=>{
        cliente.buscar(req, res)
    })
    app.get('/api/v1/cliente/id/:id?', (req, res)=>{
        cliente.buscar(req, res)
    })
}