class Tabelas{

    conexao;

    conectar(conexao){
        this.conexao = conexao;
        return this; 
    }

    tabelas(){
        const tabelas = [
            `
            CREATE TABLE IF NOT EXISTS tb_usuarios (
                id_usuario int NOT NULL AUTO_INCREMENT,
                nome_usuario varchar(50) NOT NULL,
                username_usuario varchar(50) NOT NULL,
                PRIMARY KEY (id_usuario)
            );
        `,
        `
            CREATE TABLE IF NOT EXISTS tb_usuarios_perfil (
                id_usuario int NOT NULL AUTO_INCREMENT,
                cargo_usuario varchar(50) NOT NULL,
                cpf_usuario varchar(11) NOT NULL UNIQUE,
                email_usuario varchar(50) NOT NULL,
                senha_usuario varchar(50) NOT NULL,
                PRIMARY KEY (id_usuario)
            );
        `,
        `
            CREATE TABLE IF NOT EXISTS tb_token_sessao (
                id_sessao int NOT NULL AUTO_INCREMENT,
                id_usuario int NOT NULL,
                token varchar(40) NOT NULL,
                data_criacao_token varchar(20) NOT NULL,
                horario_expiracao_token varchar(20) NOT NULL,
                PRIMARY KEY (id_sessao)
            )
        `,
        `
            CREATE TABLE IF NOT EXISTS tb_atendimentos (
                id_atendimento int NOT NULL AUTO_INCREMENT,
                id_usuario int NOT NULL,
                id_cliente int NOT NULL,
                tipo_servico varchar(30) NOT NULL,
                data_atendimento varchar(30) NOT NULL,
                horario_atendimento varchar(30) NOT NULL,
                status_atendimento varchar(30) NOT NULL,
                data_criacao_atendimento varchar(20) NOT NULL,
                PRIMARY KEY (id_atendimento)
            )
        `,
        `
            CREATE TABLE IF NOT EXISTS tb_clientes (
                id_cliente int NOT NULL AUTO_INCREMENT,
                nome_cliente varchar(30) NOT NULL,
                cpf_cliente varchar(11) NOT NULL,
                nome_animal_cliente varchar(20) NOT NULL,
                idade_animal_cliente int,
                peso_animal_cliente int,
                data_criacao_cliente varchar(20) NOT NULL,
                telefone_cliente varchar(12) NOT NULL,
                email_cliente varchar(30) NOT NULL,
                PRIMARY KEY (id_cliente)
            )
        `,
        `
            CREATE TABLE IF NOT EXISTS tb_endereco (
                id_endereco int NOT NULL AUTO_INCREMENT,
                cpf_cliente varchar(11) NOT NULL,
                cep_cliente int(11),
                logradouro_cliente varchar(40),
                cidade_cliente varchar(20),
                estado_cliente varchar(20),
                num_cliente int(11),
                complemento_cliente varchar(30),
                PRIMARY KEY (id_endereco)
            )
        `
        ]
        return tabelas;
    }

    criarTabelas(){
        const query = this.tabelas();
        query.forEach(tabela=>{
            this.conexao.query(tabela, erro=>{
                if(erro){
                    console.log(erro)
                }
            })
        })
    }

}

module.exports = new Tabelas;