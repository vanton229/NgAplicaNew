import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CadOutControlDameVisitaCliente, ParamInControlDameVisitaCliente } from '../classes/data_dame_visitas_cliente';
import { APIRest } from '@laranda/lib-sysutil';
import Swal from 'sweetalert2';
import { CadOutDameSistemas } from '../classes/data_sistemas';
import { CadOutDameStatusCasos } from '../classes/data_status_casos';

@Injectable({
  providedIn: 'root'
})
export class DameVisitasService { 
  CadOut : CadOutControlDameVisitaCliente[] = [];
  visible : boolean = false;

  constructor(
    private aPIRest: APIRest,
    
  ) { }


  private buscarPost_DameVisitas(parametrosVisita:ParamInControlDameVisitaCliente, Url: string): Observable<any>{
    return this.aPIRest.post_REST(Url, 'WDame_visitas_cliente', 'Visita', false, parametrosVisita);
  };

  consultaVisitas(Url : string,parametrosVisita:ParamInControlDameVisitaCliente)  {
    return new Promise(( resolve, reject ) => {
      this.buscarPost_DameVisitas(parametrosVisita, Url).subscribe((datosX) => {
        if (datosX.Status !== 0) {
          Swal.fire('Error WDame_visitas_cliente', `Status: ${datosX.Status} \n Mensaje: ${datosX.Mensaje}`  , 'error');
          
          reject(datosX);
        } else {
            this.CadOut = datosX.CadJson;
           // console.log('ConsultaVisitas', this.ConsultaVisitas);
            resolve(this.CadOut);
            this.visible = true;
        }
      });
    });
  };    
}

