const app = require('express')();
const cors = require('cors')();
const consign = require('consign');
const bodyParser = require('body-parser');

module.exports = ()=>{
    app.use(cors);
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json({extended: true}));

    consign()
        .include('servidor/controllers')
        .into(app);
    
    return app;
}