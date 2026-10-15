import { Injectable } from "@angular/core";
import { CadOutDameStatusCasos } from "../classes/data_status_casos";
import { Observable } from "rxjs";
import { APIRest } from "@laranda/lib-sysutil";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class DameStatusCasosService { 
  CadOut : CadOutDameStatusCasos[] = [];
  visible : boolean = false;

  constructor(
    private aPIRest: APIRest,
    
  ) { }


  private buscarPost_DameStatusCasos(Url: string): Observable<any>{
    return this.aPIRest.post_REST(Url, 'WDame_status_casos', 'Statuscasos', false);
  };

  consultaStatusCasos(Url : string)  {
    return new Promise(( resolve, reject ) => {
      this.buscarPost_DameStatusCasos(Url).subscribe((datosX) => {
        if (datosX.Status !== 0) {
          Swal.fire('Error WDame_status_casos', `Status: ${datosX.Status} \n Mensaje: ${datosX.Mensaje}`  , 'error');
          
          reject(datosX);
        } else {
            this.CadOut = datosX.CadJson;
            //console.log('ConsultaStatusCasos', this.CadOut);
            resolve(this.CadOut);
            this.visible = true;
        }
      });
    });
  };    
}