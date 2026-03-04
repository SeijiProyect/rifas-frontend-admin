import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GrupoService } from 'src/app/services/grupo.service';
import { UniversidadService } from 'src/app/services/universidad.service';

@Component({
  selector: 'app-universidades-list',
  templateUrl: './universidades-list.component.html',
  styleUrls: ['./universidades-list.component.scss']
})
export class UniversidadesListComponent implements OnInit {

  @Output() selectUniversidad: EventEmitter<string>;

  public loading: boolean = false;
  public universidades: any;
  public selectedUniversidad = 'todos';

  constructor(private _universidadService: UniversidadService) {
    // Inicializamos la emicion de eventos
    this.selectUniversidad = new EventEmitter();
  }

  ngOnInit(): void {
    //CARGO UNIVERSIDADES
    this.getUniversidades();
  }

  emitirUniversidadSelecionado(grupo: string) {
    // Usando la variable emitimos el valor que queremos enviar
    this.selectUniversidad.emit(grupo);
  }

  getUniversidades() {
    this.loading = true;
    this._universidadService.getUniversidadesList().subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        console.log("Universidades");
        console.log(response.data);
        this.universidades = response.data;
      }
      this.loading = false;
    });
  }

  universidadChange(event: any) {
    this.selectedUniversidad = event.value;
    this.emitirUniversidadSelecionado(this.selectedUniversidad);

  }
}
