export class ParamInControlDameVisitaCliente {
  nucliente: number;
  desde: string;
  hasta: string;
  tpservicio: string;

  constructor() {
    this.nucliente = 0;
    this.desde = '';
    this.hasta = '';
    this.tpservicio = '';
    }
}

interface IVisitaCliente {
  Nuvisita: string;
  Cocliente: string;
  Nmcliente: string;
  Sistema: string;
  Modalidad: string;
  Coproyecto: string;
  Txproyecto: string;
  Descrip: string;
  Flvisita: string;
  Hrdesde: string;
  Hrhasta: string;
  Horas: string;
  Analista: string;
}

export class CadOutControlDameVisitaCliente implements IVisitaCliente {
  Nuvisita: string;
  Cocliente: string;
  Nmcliente: string;
  Sistema: string;
  Modalidad: string;
  Coproyecto: string;
  Txproyecto: string;
  Descrip: string;
  Flvisita: string;
  Hrdesde: string;
  Hrhasta: string;
  Horas: string;
  Analista: string;
  visible: boolean = false;

  constructor() {
    this.Nuvisita = '';
    this.Cocliente = '';
    this.Nmcliente = '';
    this.Sistema = '';
    this.Modalidad = '';
    this.Coproyecto = '';
    this.Txproyecto = '';
    this.Descrip = '';
    this.Flvisita = '';
    this.Hrdesde = '';
    this.Hrhasta = '';
    this.Horas = '';
    this.Analista = '';
  }
}
