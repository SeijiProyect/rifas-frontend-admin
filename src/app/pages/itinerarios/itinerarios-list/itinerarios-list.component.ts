import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ItinerarioService } from 'src/app/services/itinerario.service';

@Component({
  selector: 'app-itinerarios-list',
  templateUrl: './itinerarios-list.component.html',
  styleUrls: ['./itinerarios-list.component.scss']
})
export class ItinerariosListComponent implements OnInit {

  // Creamos la variable a enviar al padre
  @Output() selectItinerario: EventEmitter<string>;
  @Output() visible_itinerario: EventEmitter<boolean>;

  @Input() selectedGrupo: number;
  public loading: boolean = false;
  public itinerarios: any;
  public selectedItinerario = 'todos';
  public visible: boolean = false;

  constructor(private _itinerarioService: ItinerarioService) {
    // Inicializamos la emicion de eventos
    this.selectItinerario = new EventEmitter();
    this.visible_itinerario = new EventEmitter();
  }

  ngOnInit(): void {

    this.getItinerarios();

    /* console.log("Valor de grupo seleccionado: " + this.selectedGrupo);
 
     if (this.selectedGrupo != 0) {
       //Cargo Itinerarios por Grupo
       this.getItinerariosByGrupo();
 
     } else {
       //CARGO LA LISTA DE ITINERARIOS
       this.getItinerarios();
     }*/

  }

  emitirItinerarioSelecionado(itinerario: string) {
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
          this.selectedItinerario = this.itinerarios[0]['id'];
          this.visible = true;
          this.emitirItinerarioSelecionado(this.selectedItinerario);
        }
      }
      this.loading = false;
    });
  }

  itinerarioChange(event: any) {
    this.selectedItinerario = event.value;
    this.emitirItinerarioSelecionado(this.selectedItinerario);
  }

}
