import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CadOutControlDameVisitaCliente, ParamInControlDameVisitaCliente } from '../classes/data_dame_visitas_cliente';
import { APIRest } from '@laranda/lib-sysutil';
import Swal from 'sweetalert2';
import { CadOutDameSistemas } from '../classes/data_sistemas';
import { CadOutDameStatusCasos } from '../classes/data_status_casos';
import { CadOutDameAsunto, ParamInDameAsunto } from '../classes/data_asunto';

@Injectable({
  providedIn: 'root'
})
export class DameAsuntoService { 
  CadOut : CadOutDameAsunto[] = [];
  visible : boolean = false;

  constructor(
    private aPIRest: APIRest,
    
  ) { }


  private buscarPost_DameAsunto(parametrosAsunto:ParamInDameAsunto, Url: string): Observable<any>{
    return this.aPIRest.post_REST(Url, 'WDame_Asunto', 'Asunto', false, parametrosAsunto);
  };

  consultaAsuntos(Url : string,parametrosAsunto:ParamInDameAsunto)  {
    return new Promise(( resolve, reject ) => {
      this.buscarPost_DameAsunto(parametrosAsunto, Url).subscribe((datosX) => {
        if (datosX.Status !== 0) {
          Swal.fire('Error WDame_asuntos', `Status: ${datosX.Status} \n Mensaje: ${datosX.Mensaje}`  , 'error');
          
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