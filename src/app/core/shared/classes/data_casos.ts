export class ParamInDameCasos {
    nucli: number;
    nuSistema: number;
    prog: string;
    analista: string;
    stat: string;
    desde: string;
    hasta: string;

    constructor() {
        this.nucli     = 0;
        this.nuSistema = 0;
        this.prog      = '';
        this.analista  = '';
        this.stat      = '';
        this.desde     = '';
        this.hasta     = '';
    }
}

interface IStatus {
    Codstat: string;
    Stat: string;
    Fechastatus: string;
}

interface IDameCasos {
    Numero: string;
    Fechacarga: string;
    Sistema: string;
    Tipo: string;
    Descripcorta: string;
    Descriplarga: string;
    Status: IStatus;
    Nerd: string;
    Analista: string;
    Ruta: string;
    Uplica: string;
}

export class CadOutDameCasos implements IDameCasos {
    Numero: string;
    Fechacarga: string;
    Sistema: string;
    Tipo: string;
    Descripcorta: string;
    Descriplarga: string;
    Status: IStatus = { Codstat: '', Stat: '', Fechastatus: '' };
    Nerd: string;
    Analista: string;
    Ruta: string;
    Uplica: string;

    constructor() {
        this.Numero             = '';
        this.Fechacarga         = '';
        this.Sistema            = '';
        this.Tipo               = '';
        this.Descripcorta       = '';
        this.Descriplarga       = '';
        this.Nerd               = '';
        this.Analista           = '';
        this.Ruta               = '';
        this.Uplica             = '';
    }
}