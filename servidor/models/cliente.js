const conexao = require('../infra/config');
let tokenStatus;

class Cliente {

    buscar(req, res){
        tokenStatus = undefined;
        this.validarToken(req.headers.authorization);
        setTimeout(() => {
            if(tokenStatus){
                const sql = `select * from tb_clientes as TBC INNER JOIN tb_endereco as TBE on TBC.cpf_cliente = ${req.params.cpf} and TBE.cpf_cliente = ${req.params.cpf}`;
                conexao.query(sql, (erro, resultados)=>{
                    if(erro || !resultados[0]){
                        res.send({ codeStatus: 200, data: { message: "Cliente não encontrado." } })
                    }else if(resultados){
                        res.send({ codeStatus: 200, data: resultados })
                    }
                });
            }else{
                res.status(401);
                res.send({ codeStatus: 401, data: { message: "Token inválido." } })
            }
        }, 200);
    }

    validarToken(token){
        const sql = `select * from tb_token_sessao where token = '${token}'`;
        conexao.query(sql, (erro, resultados)=>{
            if(erro){
                this.setTokenStatus(false);
            }else if(resultados[0]){
                this.setTokenStatus(true);
            }
        });
    }

    setTokenStatus(status){
        tokenStatus = status;
    }

}

module.exports = new Cliente
