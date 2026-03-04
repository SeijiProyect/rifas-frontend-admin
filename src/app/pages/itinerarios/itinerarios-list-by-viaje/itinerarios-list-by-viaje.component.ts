import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ItinerarioService } from 'src/app/services/itinerario.service';

@Component({
  selector: 'app-itinerarios-list-by-viaje',
  templateUrl: './itinerarios-list-by-viaje.component.html',
  styleUrls: ['./itinerarios-list-by-viaje.component.scss']
})
export class ItinerariosListByViajeComponent implements OnInit {

  // Creamos la variable a enviar al padre
  @Output() selectItinerario: EventEmitter<any>;
  @Output() visible_itinerario: EventEmitter<boolean>;

  @Input() selectedViaje: number;
  public selected: any;
  
  public loading: boolean = false;
  public itinerarios: any;
  //public selectedItinerario = 'todos';
  public visible: boolean = false;

  constructor(private _itinerarioService: ItinerarioService) {
    // Inicializamos la emicion de eventos
    this.selectItinerario = new EventEmitter();
    this.visible_itinerario = new EventEmitter();
  }

  ngOnInit(): void {
    let selected = localStorage.getItem("selectedItinerario");
    // INICIALIZAR PRIMERO LA SELECCION ANTES DE CARGAR EL COMBO BOX
    console.log("ITINERARIO SELECCIONADO: " + selected);
    if (selected != null) {
      this.selected = Number(selected);
    }

    //let selectedViaje = localStorage.getItem("selectedViaje");

    //selectedViaje

    // INICIALIZAR PRIMERO LA SELECCION ANTES DE CARGAR EL COMBO BOX
    console.log("VIAJE SELECCIONADO (ITINERARIO): " + this.selectedViaje);
    if (this.selectedViaje != 0) {
      this.selectedViaje = Number(this.selectedViaje);
      this.getItinerariosByViaje(this.selectedViaje);
    }else{
      this.getItinerarios();
    }
  }

  emitirItinerarioSelecionado(itinerario: any) {
    // Usando la variable emitimos el valor que queremos enviar
    this.selectItinerario.emit(itinerario);
    this.visible_itinerario.emit(this.visible);
  }


  getItinerarios() {
    this.loading = true;
    this._itinerarioService.getItinerarios().subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        this.itinerarios = response.data;
      }
      this.loading = false;
    });
  }

  getItinerariosByViaje(idViaje: number) {
    this.loading = true;
    this._itinerarioService.getItinerariosByViaje(idViaje).subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        console.log("lista itinerarios por viaje:" + response.data);
        this.itinerarios = response.data;

        console.log("Elementos ITINERARIO : " + this.itinerarios);
        //this.tamanio = this.itinerarios.length;
        if (this.itinerarios.length == 1) {
          //console.log("Valor ID grupo:" + this.grupos[0]['id']);
          this.selected = this.itinerarios[0];
          this.visible = true;
          let itinerario = this.itinerarios[0];
          this.emitirItinerarioSelecionado(this.selected);
        }
      }
      this.loading = false;
    });
  }

  getItinerariosByGrupo(idGrupo: number) {
    this.loading = true;
    this._itinerarioService.getItinerariosByGrupo(idGrupo).subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        console.log("lista itinerarios por grupo:" + response.data);
        this.itinerarios = response.data;

        console.log("Elementos ITINERARIO : " + this.itinerarios);
        //this.tamanio = this.itinerarios.length;
        if (this.itinerarios.length == 1) {
          //console.log("Valor ID grupo:" + this.grupos[0]['id']);
          this.selected = this.itinerarios[0]['id'];
          this.visible = true;
          this.emitirItinerarioSelecionado(this.selected);
        }
      }
      this.loading = false;
    });
  }

  itinerarioChange(event: any) {
    this.selected = event.value;
    this.emitirItinerarioSelecionado(this.selected);
  }


}
