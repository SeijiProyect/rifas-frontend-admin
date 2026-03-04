import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasajeroService } from '../../../services/pasajero.service';
import { PasajeroFormComponent } from '../../pasajeros/pasajero-form/pasajero-form.component';
import { DineroComponent } from '../../dinero/dinero.component';
import { DocumentosListPersonaComponent } from '../../documentos/documentos-list-persona/documentos-list-persona.component';

@Component({
  selector: 'app-persona-tab',
  templateUrl: './persona-tab.component.html',
  styleUrls: ['./persona-tab.component.scss']
})
export class PersonaTabComponent implements OnInit {

  pasajero_id = '';
  @ViewChild(PasajeroFormComponent) hijo!: PasajeroFormComponent;
  @ViewChild(DineroComponent) hijo_2!: DineroComponent;
  @ViewChild(DocumentosListPersonaComponent) hijo_3!: DocumentosListPersonaComponent;

  constructor(private _pasajeroService: PasajeroService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params) => {
      //console.log(params);
      if (params['id']) {
        // console.log('Dentro de parms PERSONA TAB');
        //console.log("Valor de parm: " + params['id']);
        localStorage.setItem("idPersona", params['id']);
      }
    })
  }

  ngOnInit() {
    // console.log("Valor pasajero INI: " + this.pasajero_id);
    let idPersona = localStorage.getItem("idPersona");
    this.getPasajeroByPersonaId(Number(idPersona));
  }

  getPasajeroByPersonaId(idPersona: number) {
    this._pasajeroService.getPasajeroActivoByPersona(idPersona).subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        let pasajero = response.data;
        /* localStorage.setItem("idPasajero", pasajero.id.toString());
         var id_pas = localStorage.getItem("idPasajero");*/
        this.pasajeroSeleccionado(pasajero.id);
      }
    });
  }

  pasajeroSeleccionado(event: any) {
    //console.log("Valor pasajero seleccionado: ");
    //console.log(event);
    this.pasajero_id = event;
    this.hijo.cargarPasajero(Number(this.pasajero_id));
    this.hijo_2.cargarDineroPasajero(Number(this.pasajero_id));
    this.hijo_3.getDocumentosByPasajero(Number(this.pasajero_id));
  }

}
