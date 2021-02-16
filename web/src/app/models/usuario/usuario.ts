import { Token } from "../token/token";

export class Usuario implements Token{

    id_usuario: number ;
    nome_usuario: string;
    username_usuario: string;
    cargo_usuario?: string;
    cpf_usuario?: string;
    email_usuario?: string;
    senha_usuario?: string;
    token: string;
    horario_expiracao_token: string;
}