const atendimento = require('../models/atendimento')

module.exports = app =>{
    app.get('/api/v1/atendimentos/:id?', (req, res)=>{
        atendimento.buscar(req, res)
    })
}