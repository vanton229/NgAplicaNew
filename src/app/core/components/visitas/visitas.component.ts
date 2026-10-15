import { Component, OnInit } from '@angular/core';
import { ConectorService, fech_a_HTfech, fechaHoy, HTfech_a_fech, HTfechaHoy, inicio_mes, SysFecha } from '@laranda/lib-sysutil';
import { AuthService } from '../../shared/services/auth.service';
import { DameVisitasService } from '../../shared/services/serviciosControl';
import { UntypedFormControl } from '@angular/forms';
import { ParamInControlDameVisitaCliente } from '../../shared/classes/data_dame_visitas_cliente';
import swal from 'sweetalert2';

@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.component.html',
  styleUrls: ['./visitas.component.scss']
})
export class VisitasComponent implements OnInit {
desde: string = '';
  hasta: string = '';
  totalHoras: number = 0;
  fServicio: UntypedFormControl = new UntypedFormControl(' ');
  sysFecha = new SysFecha();
  paramDameVisitaCliente: ParamInControlDameVisitaCliente = new ParamInControlDameVisitaCliente();
  
  dtColumnas: DataTables.ColumnSettings[] = [
    { title: 'N° Visita', data: 'Nuvisita' },
    { title: 'Sistema', data: 'Sistema' },
    { title: 'Proyecto', data: null, render: ( data, type, row, meta ) => {
      return data.Coproyecto + ' - ' + data.Txproyecto;
    }},
    { title: 'Descripcion', data: 'Descrip' },
    { title: 'Fecha', data: 'Flvisita' },
    { title: 'Hora Desde', data: 'Hrdesde' },
    { title: 'Hora Hasta', data: 'Hrhasta' },
    { title: 'Horas', data: 'Horas' },
    { title: 'Analista', data: 'Analista' }
  ];

  constructor(
    private autenticaCli: AuthService,
    public dameVisitas: DameVisitasService,
    private conectorService: ConectorService,
  ) { }

  ngOnInit(): void {
    this.conectorService.getParametros();
    this.fServicio.valueChanges.subscribe(valor => { this.paramDameVisitaCliente.tpservicio = valor; });
    if (this.paramDameVisitaCliente.desde !== '' && this.paramDameVisitaCliente.hasta !== '') {
      this.desde = fech_a_HTfech(this.paramDameVisitaCliente.desde);
      this.hasta = fech_a_HTfech(this.paramDameVisitaCliente.hasta);
    } else {
      this.desde = fech_a_HTfech(inicio_mes(fechaHoy()));
      this.hasta = HTfechaHoy();
    }

    if (this.paramDameVisitaCliente.tpservicio !== '') {
      this.fServicio.patchValue(this.paramDameVisitaCliente.tpservicio);
    }    

    // this.paramDameVisitaCliente.CadOut = [];
    this.paramDameVisitaCliente.tpservicio = ' ';
    this.totalHoras = 0;
    //this.paramDameVisitaCliente.visible = true;
    this.autenticaCli.leerToken();
    
  }

  getBuscar() {
    this.totalHoras = 0;
     this.dameVisitas.visible = false;
    if (this.desde > this.hasta) {
      swal.fire('Error en Fechas', 'Fecha desde no pude ser mayor a la fecha hasta', 'error');
    } else {
      this.paramDameVisitaCliente.nucliente = +this.autenticaCli.CadOut.Numcli;
      this.paramDameVisitaCliente.desde = HTfech_a_fech(this.desde);
      this.paramDameVisitaCliente.hasta = HTfech_a_fech(this.hasta);
      //this.paramDameVisitaCliente.consultar();
      this.dameVisitas.consultaVisitas(this.conectorService.info.URL_REST, this.paramDameVisitaCliente).then(() => {
        //this.controlDameVisitaCliente = this.dameVisitas.ConsultaVisitas[0];
        console.log('DameVisitaCliente', this.dameVisitas.CadOut);
        //this.dameVisitas.visible = true;
      
       setTimeout(() => {
         const horas: any[] = Array.isArray(this.dameVisitas.CadOut)
           ? (this.dameVisitas.CadOut as any[])
           : [];

         for (const control of horas) {
           const valor = typeof control === 'object' && control !== null && 'Horas' in control
             ? (control as any).Horas ?? '0'
             : control ?? '0';

           this.totalHoras += parseFloat(String(valor).replace(',', '.'));
           //console.log('Visible:', this.dameVisitas.visible);
         }
         this.dameVisitas.visible = true;
           
       }, 500);
       });
    }
  }


}
