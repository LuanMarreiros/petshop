const conexao = require('../infra/config');
const token = require('../models/token')
let tokenStatus;
let date = new Date();

class Atendimento {

    dataAtual = token.pegarDataHoje();
    horaAtual = this.pegarHoraAtual();

    buscar(req, res) {
        tokenStatus = undefined;
        this.validarToken(req.headers.authorization);
        setTimeout(() => {
            if (tokenStatus) {
                const sql = req.params.id ? `select * from tb_atendimentos as TBA inner join (select id_cliente, nome_cliente from tb_clientes) TBC on TBA.id_cliente = TBC.id_cliente where TBA.id_atendimento = ${req.params.id}` :
                    `select * from tb_atendimentos as TBA inner join (select id_cliente, nome_cliente from tb_clientes) TBC on TBA.id_cliente = TBC.id_cliente where TBA.data_atendimento >= '${this.dataAtual}' order by TBA.data_atendimento, TBA.horario_atendimento`;
                conexao.query(sql, (erro, resultados) => {
                    if (erro || !resultados[0]) {
                        if (req.params.id) {
                            res.send({ codeStatus: 404, data: { message: "Desculpe, não foi possível encontrar o agendamento." } })
                        } else {
                            res.send({ codeStatus: 404, data: { message: "Desculpe, não há atendimentos cadastrados no sistema." } })
                        }
                    } else if (resultados) {
                        if (req.params.id) {
                            res.send({ codeStatus: 200, data: resultados })
                        } else {
                            resultados = this.formatarHorarioAtendimento(resultados);
                            res.send({ codeStatus: 200, data: resultados })
                        }
                    }
                });
            } else {
                res.send({ codeStatus: 401, data: { message: "Token inválido." } })
            }
        }, 200);
    }

    buscarFull(req, res) {
        tokenStatus = undefined;
        this.validarToken(req.headers.authorization);
        setTimeout(() => {
            if (tokenStatus) {
                const sql = req.params.id ? `select * from tb_atendimentos as TBA inner join tb_clientes as TBC on TBA.id_cliente = TBC.id_cliente where TBA.id_atendimento = ${req.params.id}` :
                    `select * from tb_atendimentos as TBA inner join tb_clientes as TBC on TBA.id_cliente = TBC.id_cliente where TBA.data_atendimento >= '${this.dataAtual}'`;
                conexao.query(sql, (erro, resultados) => {
                    if (erro || !resultados[0]) {
                        if (req.params.id) {
                            res.send({ codeStatus: 404, data: { message: "Desculpe, não foi possível encontrar o atendimento." } })
                        } else {
                            res.send({ codeStatus: 404, data: { message: "Desculpe, não há atendimentos cadastrados no sistema." } })
                        }
                    } else if (resultados) {
                        res.send({ codeStatus: 200, data: resultados })
                    }
                });
            } else {
                res.send({ codeStatus: 401, data: { message: "Token inválido." } })
            }
        }, 200);
    }

    validarToken(token) {
        const sql = `select * from tb_token_sessao where token = '${token}'`;
        const setTokenStatus = (status) => {
            tokenStatus = status;
        }
        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                setTokenStatus(false);
            } else if (resultados[0]) {
                setTokenStatus(true);
            }
        });
    }

    pegarHoraAtual() {
        const date = new Date();
        return `${new Date().getHours() <= 9 ? '0' + new Date().getHours() : new Date().getHours()}:${new Date().getMinutes() <= 9 ? '0' + new Date().getMinutes() : new Date().getMinutes()}`
    }

    formatarHorarioAtendimento(resultados) {
        let resultadosFormatados = [];

        resultados.forEach(atendimento => {
            if (atendimento.status_atendimento == "aberto") {
                resultadosFormatados.push(atendimento);
            }
        })

        return resultadosFormatados
    }

}

module.exports = new Atendimento