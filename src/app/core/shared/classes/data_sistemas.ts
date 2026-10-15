interface ISistemas {
    Nusistema: string;
    Nomsistema: string;
}

export class CadOutDameSistemas implements ISistemas {
    Nusistema: string;
    Nomsistema: string;

    constructor() {
        this.Nusistema  = '';
        this.Nomsistema = '';
    }
}