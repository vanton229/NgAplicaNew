export class ParamInAutenticaCli {
    Email: string;
    Password: string;

    constructor() {
        this.Email = '',
        this.Password = ''
    }
}

export interface IClienteData {
    Numcli : string;
    Nombrecli: string;
    Nombre: string;
    Email: string;
    Fechahora: string;
    Entradaini: string;
    Token: string;
}

export class CadOutAutenticaCli {
    Numcli : string;
    Nombrecli: string;
    Nombre: string;
    Email: string;
    Fechahora: string;
    Entradaini: string;
    Token: string;

    constructor() {
        this.Numcli = '',
        this.Nombrecli = '',
        this.Nombre = '',
        this.Email = '',
        this.Fechahora = '',
        this.Entradaini = '',
        this.Token = ''
    }
}