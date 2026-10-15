export class ParamInDameAsunto {
    siste: number;
    desde: string;
    hasta: string;

    constructor() {
        this.siste = 0;
        this.desde = '';
        this.hasta = '';
    }
}

interface IAsunto {
    Nuasunto: number;
    Sistema: string;
    Descmin: string;
    Descmax: string;
    Fecha: string;
}

export class CadOutDameAsunto implements IAsunto {
    Nuasunto: number;
    Sistema: string;
    Descmin: string;
    Descmax: string;
    Fecha: string;

    constructor() {
        this.Nuasunto = 0;
        this.Sistema  = '';
        this.Descmin  = '';
        this.Descmax  = '';
        this.Fecha    = '';
    }
}