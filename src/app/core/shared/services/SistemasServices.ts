import { Injectable } from "@angular/core";
import { CadOutDameSistemas } from "../classes/data_sistemas";
import { APIRest } from "@laranda/lib-sysutil";
import { Observable } from "rxjs";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class DameSistemasService { 
  CadOut : CadOutDameSistemas[] = [];
  visible : boolean = false;

  constructor(
    private aPIRest: APIRest,
    
  ) { }


  private buscarPost_DameSistemas(Url: string): Observable<any>{
    return this.aPIRest.post_REST(Url, 'WDame_sistemas', 'Sistemas', false);
  };

  consultaSistemas(Url : string)  {
    return new Promise(( resolve, reject ) => {
      this.buscarPost_DameSistemas(Url).subscribe((datosX) => {
        if (datosX.Status !== 0) {
          Swal.fire('Error WDame_sistemas', `Status: ${datosX.Status} \n Mensaje: ${datosX.Mensaje}`  , 'error');
          
          reject(datosX);
        } else {
            this.CadOut = datosX.CadJson;
            //console.log('ConsultaSistemas', this.CadOut);
            resolve(this.CadOut);
            this.visible = true;
        }
      });
    });
  };    
}
