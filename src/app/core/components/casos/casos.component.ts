import { Component, OnInit } from '@angular/core';
import { DameSistemasService } from '../../shared/services/SistemasServices';
import { AuthService } from '../../shared/services/auth.service';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ConectorService, fech_a_HTfech, fechaHoy, HTfech_a_fech, HTfechaHoy, inicio_anno, SysFecha } from '@laranda/lib-sysutil';
import { DameStatusCasosService } from '../../shared/services/StatusCasosServices';
import swal from 'sweetalert2';
import { ParamInDameCasos } from '../../shared/classes/data_casos';
import { DameCasosService } from '../../shared/services/CasosService';

@Component({
  selector: 'app-casos',
  templateUrl: './casos.component.html',
  styleUrls: ['./casos.component.scss']
})
export class CasosComponent implements OnInit {

  desde: string = '';
  hasta: string = '';
  fSistema: UntypedFormControl = new UntypedFormControl(0);
  sysFecha = new SysFecha();
  dtColumnas: DataTables.ColumnSettings[];
  frmStatCasos: UntypedFormGroup = new UntypedFormGroup({});
  visible: boolean = false;
  paramDamecasos : ParamInDameCasos = new ParamInDameCasos();
  
  
  IconTabla: DataTables.FunctionColumnRender = ( data, type, row, meta ) => {
    if (type === 'display') {
      let clase = '';

      switch (row.Status.Codstat) {
        case 'A':
          clase = 'LA-status-A';
          break;

        case 'B':
          clase = 'LA-status-B';
          break;

        case 'D':
          clase = 'LA-status-D';
          break;

        case 'L':
          clase = 'LA-status-L';
          break;

        case 'O':
          clase = 'LA-status-O';
          break;

        case 'P':
          clase = 'LA-status-P';
          break;

        case 'Q':
          clase = 'LA-status-Q';
          break;

        case 'R':
          clase = 'LA-status-R';
          break;

        case 'S':
          clase = 'LA-status-S';
          break;

        case 'Y':
          clase = 'LA-status-Y';
          break;
      }

      return `<i class="fa fa-lightbulb-o LA-size ${clase}"></i> ${data.Numero} - ${data.Analista}`;
      // return '<i class="'fa fa-lightbulb-o '+clase+'></i> '+ data;
    }

    return data;
  }

  DescripcionCompleta: DataTables.FunctionColumnRender = ( data, type, row, meta ) => {
    return data.Descripcorta + '<br>' + data.Descriplarga;
  }

  constructor(
    public dameSistemas: DameSistemasService,
    public dameCasos: DameCasosService,
    public dameStatusCasos: DameStatusCasosService,
    private authService: AuthService,
    private fb: UntypedFormBuilder,
    private conectorService: ConectorService
  ) {
    this.dtColumnas = [
      { title: 'Num Caso - Analista', data: null, render: this.IconTabla,
      className: 'details-control', width: '20%' },
      { title: 'Fecha Carga', data: 'Fechacarga' },
      { title: 'Sistema',     data: 'Sistema' },
      { title: 'Descripción', data: null, render: this.DescripcionCompleta },
      { title: 'Status / Fecha', data: 'Status', render: (data: any, type: any, row: any, meta) => {
        return data.Stat + ' ~ ' + data.Fechastatus;
      } }
    ];
  }

  ngOnInit()  {
    this.dameCasos.CadOut = [];
    //this.fSistema.valueChanges.subscribe(valor => { this.dameCasos.ParamIn.nuSistema = valor; });
     this.dameSistemas.consultaSistemas(this.conectorService.info.URL_REST).then(() => {
      //console.log('ConsultaSistemas', this.dameSistemas.CadOut);
    });
     this.dameStatusCasos.consultaStatusCasos(this.conectorService.info.URL_REST).then(() => {
      //console.log('ConsultaStatusCasos', this.dameStatusCasos.CadOut);
    for (const estado of this.dameStatusCasos.CadOut) {
      this.frmStatCasos.addControl('Check' + estado.Codigo, this.fb.control(estado.checked));

      const control = this.frmStatCasos.get('Check' + estado.Codigo);
      if (control) {
        control.valueChanges.subscribe(valor => {
          estado.checked = valor;
        });
      }
    }

    });

    //if (this.dameCasos.ParamIn.desde !== '' && this.dameCasos.ParamIn.hasta !== '') {
      //this.desde = fech_a_HTfech(this.dameCasos.ParamIn.desde);
      //this.hasta = fech_a_HTfech(this.dameCasos.ParamIn.hasta);
   // } else {
      this.desde = fech_a_HTfech(inicio_anno(fechaHoy()));
      this.hasta = HTfechaHoy();
   // }

    //if (this.dameCasos.ParamIn.nuSistema !== 0) {
      //this.fSistema.patchValue(this.dameCasos.ParamIn.nuSistema);
    //}


     
    //this.dameCasos.visible = true;

    this.visible = true;
  }

  getBuscar() {
    this.dameCasos.CadOut = [];
    this.visible = false;
    if (this.desde > this.hasta) {
      swal.fire('Error en Fechas', 'Fecha desde no pude ser mayor a la fecha hasta'  , 'error');
    } else {
      this.dameCasos.visible = false;
      this.paramDamecasos.nucli = +this.authService.CadOut.Numcli;

      this.paramDamecasos.desde = HTfech_a_fech(this.desde);
      this.paramDamecasos.hasta = HTfech_a_fech(this.hasta);


      this.paramDamecasos.stat = this.dameStatusCasos.CadOut
          .filter((valor: any) => valor.checked ? valor.Codigo : null)
          .map((valor: any) => valor.Codigo)
          .toString();

      this.dameCasos.consultaCasos(this.conectorService.info.URL_REST, this.paramDamecasos).then(() => {
        console.log('ConsultaCasos', this.dameCasos.CadOut);
        this.visible = true;
      });

      //setTimeout(() => this.dameCasos.visible = true, 2000);
    }
  }

}
