module.exports = app =>{
    app.post('/api/v1/token', (req, res)=>{
        const token = require('../models/token');
        let tokenId = req.body.token;
        try{
            tokenId = token.verificarToken(tokenId, res);
        }catch{
            res.set('Content-Type', 'application/json');
            res.sendStatus(500);
        }
    })
}
