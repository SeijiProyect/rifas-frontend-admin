import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Pasajero } from 'src/app/models/pasajero.model';
import { ViajeService } from '../../../services/viaje.service';
import { PasajeroService } from '../../../services/pasajero.service';

@Component({
  selector: 'app-persona-list-viaje',
  templateUrl: './persona-list-viaje.component.html',
  styleUrls: ['./persona-list-viaje.component.scss']
})
export class PersonaListViajeComponent implements OnInit {

  public idPersona = '';
  public selected: number = 0;
  public viajes: any[] = [];
  public itinerario: any;

  pasajero: Pasajero = {
    id: 0, univesidad: '', acompaniante: '', estado: '', comentarios: ''
  };

  public costos: any;
  public depositos: any;

  @Output() mensaje = new EventEmitter<string>();

  constructor(private _viajeService: ViajeService, private _pasajeroService: PasajeroService) { }

  ngOnInit() {
    let id = localStorage.getItem("idPersona");
    // INICIALIZAR PRIMERO LA SELECCION ANTES DE CARGAR EL COMBO BOX
    if (id != null) {
      this.idPersona = id;
      this.getPasajeroByPersonaId(Number(this.idPersona));
      // CARGO LA LISTA DE VIAJES PARA ESA PERSONA
      this.getViajesByPersonaId(Number(this.idPersona));
    }

  }

  getViajesByPersonaId(idPersona: number) {
    this._viajeService.getViajesListPorPersona(idPersona).subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        let viajes = response.data;
        let viajeAux;
        for (let viaje of viajes) {
          viajeAux = {
            persona_id: viaje.persona_id,
            pasajero_id: viaje.pasajero_id,
            itinerario_id: viaje.itinerario_id,
            itinerario_nombre: viaje.itinerario_nombre,
            itinerario_fechaInicio: viaje.itinerario_fechaInicio,
            itinerario_fechaFin: viaje.itinerario_fechaFin,
            grupo_id: viaje.grupo_id,
            grupo_nombre: viaje.grupo_nombre,
            viaje_id: Number(viaje.viaje_id),
            viaje_nombre: viaje.viaje_nombre

          }
          this.viajes.push(viajeAux);
        }

        //console.log("Array viajes");
        //console.log(this.viajes);
        //console.log(typeof (this.viajes[0]['viaje_id']));
        //this.getPasajeroByPersonaId(idPersona);
      }
    });

  }

  getPasajeroByPersonaId(idPersona: number) {
    this._pasajeroService.getPasajeroActivoByPersona(idPersona).subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        this.pasajero = response.data;
        localStorage.setItem("idPasajero", this.pasajero.id.toString());
        var id_pas = localStorage.getItem("idPasajero");
        //console.log("Pasajero activo: " + id_pas);
        this.getItinerarioByPasajeroId(Number(id_pas));
      }
    });

  }

  getItinerarioByPasajeroId(idPasajero: number) {
    this._pasajeroService.getItinerarioByPasajeroId(idPasajero).subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        this.itinerario = response.data;
        let idViaje = this.itinerario['itinerario']['idViaje'];
        // this.selected = 1;
        this.selected = Number(idViaje);

        //console.log("Viaje del Pasajero: " + idViaje);
        //console.log("Valor de selected: " + this.selected);
      }
    });

  }

  viajeChange(event: any) {

    this.selected = Number(event.value);
    console.log("Viaje Seleccionado: " + this.selected);
    let viaje = this.viajes.find(x => x.viaje_id == this.selected);
    console.log("Viaje seleccionado: ");
    console.log(viaje.pasajero_id);
    // Aviso a componentes que cambio el viaje de esa persona
    this.mensaje.emit(viaje.pasajero_id);

  }

}
