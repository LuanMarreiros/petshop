const config = require('./config/config');
const app = config();
const conexao = require('./infra/config');
const tabelas = require('./infra/tabelas/tabelas');
const token = require('./models/token');

conexao.connect((error)=>{
    if(error){
        console.log(erro);
    }else{
        app.listen(3000, ()=> console.log('Servidor inicializado'));
        tabelas.conectar(conexao).criarTabelas();
        setInterval(() => {
            token.removerToken();
        }, 20000);
    }
})
