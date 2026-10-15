import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIRest } from '@laranda/lib-sysutil';
import Swal from 'sweetalert2';
import { CadOutDameCasos, ParamInDameCasos } from '../classes/data_casos';

@Injectable({
  providedIn: 'root'
})
export class DameCasosService { 
  CadOut : CadOutDameCasos[] = [];
  visible : boolean = false;

  constructor(
    private aPIRest: APIRest,
    
  ) { }


  private buscarPost_DameCasos(parametrosCasos:ParamInDameCasos, Url: string): Observable<any>{
    return this.aPIRest.post_REST(Url, 'WDame_casos', 'Caso', false, parametrosCasos);
  };

  consultaCasos(Url : string,parametrosCasos:ParamInDameCasos)  {
    return new Promise(( resolve, reject ) => {
      this.buscarPost_DameCasos(parametrosCasos, Url).subscribe((datosX) => {
        if (datosX.Status !== 0) {
          Swal.fire('Error WDame_casos', `Status: ${datosX.Status} \n Mensaje: ${datosX.Mensaje}`  , 'error');
          
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

