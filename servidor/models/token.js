const conexao = require('../infra/config');

class Token {

    criar(resultados) {
        const caracteres = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', '', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '&', '$']
        let newToken;
        let horaExpiracaoToken;
        newToken = caracteres[Math.floor(Math.random() * 39)];
        for (let i = 0; i < 39; i++) {
            newToken += caracteres[Math.floor(Math.random() * 39)];
        }

        if (!resultados[1]) {
            horaExpiracaoToken = this.salvarToken(resultados, newToken);
        }

        return [newToken.toString(), horaExpiracaoToken];
    }

    salvarToken(resultados, token) {
        const dataHoje = this.pegarDataHoje();
        const horaExpiracao = this.pegarHoraExpiracao();
        let sql;

        try {
            this.removerToken(resultados[0].id_usuario);
            sql = `INSERT INTO tb_token_sessao (id_usuario, token, data_criacao_token, horario_expiracao_token) 
            VALUES (${resultados[0].id_usuario}, '${token}','${dataHoje}','${horaExpiracao}')`;

            conexao.query(sql);
        }catch{}

        return `${horaExpiracao}`;
    }

    pegarDataHoje() {
        let dia = new Date().getDate();
        let mes = new Date().getMonth() + 1;
        const ano = new Date().getFullYear();

        if (mes < 9) {
            mes = '0' + mes.toString();
        }

        if (dia < 9) {
            dia = '0' + dia.toString();
        }

        return `${ano}-${mes}-${dia}`
    }

    pegarHoraExpiracao() {
        const date = new Date();
        const horaAtual = new Date().getHours();
        date.setHours(horaAtual + 1);
        return `${date.getHours()}:${date.getMinutes()}`
    }

    removerToken(id_usuario) {
        const horaAtual = `${new Date().getHours()}:${new Date().getMinutes()}`;

        try {
            if(id_usuario){
                conexao.query(`delete from tb_token_sessao where id_usuario = '${id_usuario}'`);
            }else{
                conexao.query(`delete from tb_token_sessao where horario_expiracao_token <= '${horaAtual}'`);
            }
        } catch {
            console.log('Erro ao remover token');
        }
    }

    verificarToken(token, res) {
        try {
            conexao.query(`select * from tb_token_sessao where token = '${token}'`, (erro, resultado) => {
                if (resultado.length == 0) {
                    res.send({ codeStatus: '200', message: 'Usuário não autentificado.', status: false })
                } else {
                    res.status(200);
                    res.send({ codeStatus: '200', message: 'Usuário autentificado.', status: true })
                }
            });
        } catch {
            console.log('Erro ao verificar token');
        }
    }

}

module.exports = new Token