const conexao = require('../infra/config');
const token = require('./token');
let response;

class Usuario {

    consultarUsuario(username = null, res) {
        const sql = username ? `SELECT * FROM tb_usuarios where username_usuario = '${username}'` : 'SELECT * FROM tb_usuarios';

        conexao.query(sql, (erro, resultados) => {
            if (resultados.length == 0 || !username) {
                res.send({ codeStatus: '200', data: { message: 'Usuário não encontrado.' } })
            } else if (erro) {
                res.status(403);
                res.send({ codeStatus: '403', sqlState: hasError.sqlState, message: hasError.sqlMessage });
            } else {
                res.send({ codeStatus: '200', data: resultados })
            }

        })
    }

    consultarId(id = null, res) {
        const sql = `SELECT * FROM tb_usuarios as TU INNER JOIN tb_usuarios_perfil as TUP on TUP.id_usuario = ${id} and TU.id_usuario = ${id}`;

        conexao.query(sql, (erro, resultados) => {
            let _token;
            try {
                _token = token.criar(resultados);
            } catch (erro) {
                res.sendStatus(500);
                return;
            }

            if (erro) {
                res.status(403);
                res.send({ codeStatus: '403', sqlState: hasError.sqlState, message: hasError.sqlMessage });
            }else if( !resultados[0]) {
                res.send({ codeStatus: '200', data: [{ message: "Usuário não encontrado." }] })
            }
             else {
                res.send({ codeStatus: '200', token: _token[0], horario_expiracao_token: _token[1], data: resultados })
            }

        })
    }

    verificarSenha(request = null, res) {
        const sql = `SELECT * FROM tb_usuarios_perfil where id_usuario = ${request.id_usuario}`;

        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(403);
                res.send({ codeStatus: '403', sqlState: hasError.sqlState, message: hasError.sqlMessage });
            } else if (resultados.length == 0) {
                res.send({ codeStatus: '200', data: { message: 'Usuário não encontrado.' } })
            } else {
                if (resultados[0].senha_usuario == request.senha_usuario) {
                    res.send({ codeStatus: '200', data: { autenticado: true } })
                } else {
                    res.send({ codeStatus: '200', data: { autenticado: false } })
                }
            }
        })
    }
}

module.exports = new Usuario