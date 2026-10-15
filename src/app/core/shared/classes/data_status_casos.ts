interface IStatusCasos {
    Codigo: string;
    Descripcion: string;
}

export class CadOutDameStatusCasos implements IStatusCasos {
    Codigo: string;
    Descripcion: string;
    checked?: boolean;

    constructor() {
        this.Codigo      = '';
        this.Descripcion = '';
        this.checked     = false;
    }
}