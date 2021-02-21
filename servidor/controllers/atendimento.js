const atendimento = require('../models/atendimento')

module.exports = app =>{
    app.get('/api/v1/atendimentos/full/:id?', (req, res)=>{
        atendimento.buscarFull(req, res)
    })
    app.get('/api/v1/atendimentos/:id?', (req, res)=>{
        atendimento.buscar(req, res)
    })
}