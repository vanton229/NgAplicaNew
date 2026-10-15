import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { fech_a_HTfech, fechaHoy, HTfech_a_fech, HTfechaHoy, inicio_anno, SysFecha, ConectorService } from '@laranda/lib-sysutil';
import swal from 'sweetalert2';
import { DameSistemasService } from '../../shared/services/SistemasServices';
import { DameAsuntoService } from '../../shared/services/AsuntoServices';
import { ParamInDameAsunto } from '../../shared/classes/data_asunto';

@Component({
  selector: 'app-mejoras',
  templateUrl: './mejoras.component.html',
  styleUrls: ['./mejoras.component.scss']
})
export class MejorasComponent implements OnInit {

  desde: string = '';
  hasta: string = '';
  fSistemas: UntypedFormControl = new UntypedFormControl(0);
  sysFecha = new SysFecha();
  paramDameAsunto : ParamInDameAsunto = new ParamInDameAsunto();
  visible: boolean = false;

  dtColumnas: DataTables.ColumnSettings[] = [
    { title: 'Num Asunto', data: 'Nuasunto' },
    { title: 'Sistema', data: 'Sistema' },
    { title: 'Descripción', data: 'Descmax' },
    { title: 'Fecha', data: 'Fecha' }
  ];


  constructor(
    public dameSistemas: DameSistemasService,
    private conectorService: ConectorService,
    public dameAsunto: DameAsuntoService
  ) { }

  ngOnInit() {
    //this.fSistemas.valueChanges.subscribe(valor => { this.dameAsunto.ParamIn.siste = valor; });
    //if (this.dameAsunto.ParamIn.desde !== '' && this.dameAsunto.ParamIn.hasta !== '') {
      //this.desde = fech_a_HTfech(this.dameAsunto.ParamIn.desde);
      //this.hasta = fech_a_HTfech(this.dameAsunto.ParamIn.hasta);
    //} else {
      this.desde = fech_a_HTfech(inicio_anno(fechaHoy()));
      this.hasta = HTfechaHoy();
    //}
    //if (this.dameAsunto.ParamIn.siste !== 0) { this.fSistemas.patchValue(this.dameAsunto.ParamIn.siste); }
    //this.dameSistemas.consultar();
    this.dameSistemas.consultaSistemas(this.conectorService.info.URL_REST).then(() => {
    console.log( this.dameSistemas.CadOut );
    });

    
    //this.dameAsunto.CadOut = [];
    //this.dameAsunto.visible = true;
  

    // this.dameAsunto.CadOut = [];
    //this.dameAsunto.visible = true;
  }


  getBuscar() {

    if (this.desde > this.hasta) {
      swal.fire('Error en Fechas', 'Fecha desde no pude ser mayor a la fecha hasta'  , 'error');

    } else {
      this.dameAsunto.CadOut = [];
      this.paramDameAsunto.desde = HTfech_a_fech(this.desde);
      this.paramDameAsunto.hasta = HTfech_a_fech(this.hasta);
      this.paramDameAsunto.siste = this.fSistemas.value;
      console.log('Parametros', this.paramDameAsunto);
      this.dameAsunto.consultaAsuntos(this.conectorService.info.URL_REST, this.paramDameAsunto).then(() => {
        console.log( this.dameAsunto.CadOut );
      });
      setTimeout(() => {
      this.visible = true;
    }, 1000);
    }
  }
}
