const mySql = require('mysql');

const conexao = mySql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '959120905',
    database: 'petshop_schema',
})

module.exports = conexao;