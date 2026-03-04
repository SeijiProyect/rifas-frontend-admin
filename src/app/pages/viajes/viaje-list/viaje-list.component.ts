import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Pasajero } from 'src/app/models/pasajero.model';
import { ViajeService } from '../../../services/viaje.service';
import { PasajeroService } from '../../../services/pasajero.service';

@Component({
  selector: 'app-viaje-list',
  templateUrl: './viaje-list.component.html',
  styleUrls: ['./viaje-list.component.scss']
})
export class ViajeListComponent implements OnInit {

  // Creamos la variable a enviar al padre
  @Output() result = new EventEmitter<number>();

  public idPersona = '';
  public selected: number = 0;
  public viajes: any[] = [];
  public itinerario: any;

  public costos: any;
  public viaje: any;

  constructor(private _viajeService: ViajeService, private _pasajeroService: PasajeroService) {
    // Inicializamos la emicion de eventos
    this.result = new EventEmitter();
  }

  ngOnInit() {
    //Cargo lista de viajes
    this.getViajesActivos();

  }

  emitirMensajePadre(idViaje: number) {
    // Usando la variable emitimos el valor que queremos enviar
    this.result.emit(idViaje);
  }

  getViajesActivos() {
    this._viajeService.getViajesActivosList().subscribe((response: any) => {
      let status = response.status;
      console.log(response.data);
      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        console.log("Listado de viajes:");
        console.log(response.data);
        let viajes = response.data;
        let viajeAux;
        for (let viaje of viajes) {
          viajeAux = {
            viaje_id: Number(viaje.id),
            viaje_nombre: viaje.Nombre
          }
          this.viajes.push(viajeAux);
        }
      }

      if (status == 'error') {
        console.error('Error:', response);
      }

    }, error => {
      console.error('Error:', error);
      //this.showErrorMessage();
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
    console.log("ID VIAJE SELECCIONADO: ");
    console.log(event.value);
    this.selected = event.value;
    this.emitirMensajePadre(this.selected);

  }

}
