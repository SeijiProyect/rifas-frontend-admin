import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { SorteoService } from 'src/app/services/sorteo.service';

@Component({
  selector: 'app-sorteos-checkbox',
  templateUrl: './sorteos-checkbox.component.html',
  styleUrls: ['./sorteos-checkbox.component.scss']
})
export class SorteosCheckboxComponent implements OnInit {

  @Input() selectedRifa: number = 0;
  @Output() validar = new EventEmitter<boolean>();
  public sorteos: any[] = [];
  activo: boolean = false;
  selectedItems: number[];
  allComplete: boolean = false;

  today: Date = new Date();

  constructor(private _sorteoService: SorteoService) {
    this.selectedItems = new Array<number>();
  }

  ngOnInit(): void {
    // Carga inicial de checkBox
    this.listaSorteosByRifa(this.selectedRifa);
  }

  avisarComponentePadre(valido: boolean) {
    this.validar.emit(valido);
  }

  listaSorteosByRifa(idRifa: number) {
    this.allComplete = false;
    this.selectedItems = new Array<number>();
    this.activo = false;
    this._sorteoService.getSorteosByRifaId(idRifa).subscribe((response: any) => {
      let status = response.status;
      // Inicializo la lista de sorteos para el combo box
      this.sorteos = [];

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        let sorteos = response.data;
        let sorteoAux;
        //console.log("Sorteos LISTA ");
        //console.log( response.data);

        for (let sorteo of sorteos) {

          var fecha_sorteo = sorteo.fechaSorteo.date == 'null' ? new Date() : new Date(sorteo.fechaSorteo.date);
          // console.log("fecha sorteo (formato 1): " + sorteo.fechaSorteo);
          // console.log("fecha sorteo: " + fecha_sorteo);

          if (this.today < fecha_sorteo) {
            sorteoAux = {
              index: Number(sorteo.id),
              sorteo_id: Number(sorteo.id),
              rifa_id: Number(sorteo.rifa_id),
              sorteo_fecha: sorteo.fechaSorteo,
              sorteo_numero: sorteo.sorteoNumero,
              rifa_nombre: sorteo.rifa_nombre,
              numero_inicial: sorteo.numeroInicialTalon,
              numero_final: sorteo.numeroFinalTalon,
              name: sorteo.sorteoNumero + " - Sorteo: ",
              completed: false,
              checked: false
            }
            this.sorteos.push(sorteoAux);
          }

        }
        //console.log("Lista de sorteos por Rifa");
        //console.log(sorteos);
      }
    });

  }

  seleccionarTodo(completed: boolean) {
    //console.log("Funcion:: seleccionarTodo");
    this.allComplete = completed;
    this.sorteos.forEach(row => row.checked = completed);
    //console.log("Todos los sorteos seleccionados: " +this.sorteos);
    if (!this.verificarCheckBoxSorteosCompleto()) {
      //Mostrar mensaje de error en componente Padre
      this.avisarComponentePadre(false);
    } else {
      //Mostrar valido en componente Padre
      this.avisarComponentePadre(true);
    }
  }

  getSorteoID(e: any, id: number) {
    this.allComplete = false;
    if (e.target.checked) {
      //console.log(id + 'checked');
      this.selectedItems.push(id);
    }
    else {
      // console.log(id + 'Unchecked');
      this.selectedItems = this.selectedItems.filter(m => m != id);
    }
    // Inicializo los checked de la lista de Sorteo
    this.sorteos.forEach(row => row.checked = false);
    // Asigno los seleccionados y los deseleccionados
    this.asignarCheckSeleccionados();
    // console.log(this.selectedItems);
    if (!this.verificarCheckBoxSorteosCompleto()) {
      //Mostrar mensaje de error en componente Padre
      this.avisarComponentePadre(false);
    } else {
      //Mostrar valido en componente Padre
      this.avisarComponentePadre(true);
    }

  }

  private asignarCheckSeleccionados() {
    for (let sorteo_id of this.selectedItems) {
      var sorteo = this.sorteos.find(x => x.sorteo_id == sorteo_id);
      if (sorteo) {
        sorteo.checked = true;
      }
    }
  }

  private verificarCheckBoxSorteosCompleto() {
    for (let sorteo of this.sorteos) {
      if (sorteo.checked == true) {
        return true;
      }
    }
    return false;
  }

}
