import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { SorteoService } from '../../../services/sorteo.service';
import { MatPaginator } from '@angular/material/paginator';

import { Sorteo } from 'src/app/models/sorteo.model';
import { MatTable } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

const ELEMENT_DATA: Sorteo[] = [];

@Component({
  selector: 'app-sorteos-list',
  templateUrl: './sorteos-list.component.html',
  styleUrls: ['./sorteos-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class SorteosListComponent implements OnInit {
  pantalla = '';
  public organizador: any = null;
  today: Date = new Date();
  public sorteo: Sorteo;

  public sorteoIni: Sorteo = {
    id: 0, fecha_sorteo: this.today, numero_final_talon: 0,
    numero_inicial_talon: 0, numero_sorteo: 0, porcentaje_comision: 0, talon_valor: 0,
    lugar: ''
  };

  public sorteos: any[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) tabla1!: MatTable<Sorteo>;
  @Output() mostrar = new EventEmitter<string>();

  columnas: string[] = ['Id', 'Numero', 'Fecha', 'Desde', 'Hasta', 'Rifa', 'Actions'];
  dataSource = ELEMENT_DATA;

  constructor(
    private _sorteoService: SorteoService,
    public router: Router,
    private snackBar: MatSnackBar
  ) {
    this.sorteo = {
      id: 0, fecha_sorteo: this.today, numero_final_talon: 0,
      numero_inicial_talon: 0, numero_sorteo: 0, porcentaje_comision: 0, talon_valor: 0,
      lugar: ''
    };
  }

  async ngOnInit() {
    let id = localStorage.getItem("idRifa");
    console.log("RIFA SELECCIONADA EN FormControl: " + id);
    //this.selectedRifa = Number(id);
    await this.getSorteosByRifa(Number(id));
  }

  announceSortChange(event: any) {
  }

  getSorteosByRifa(idRifa: number) {

    this._sorteoService.getSorteosByRifaId(idRifa).subscribe((response: any) => {
      let status = response.status;
      // Inicializo la lista de sorteos para el combo box
      this.sorteos = [];

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        let sorteos = response.data;
        console.log("Listado de sorteos por rifa");
        console.log(sorteos);
        let sorteoAux;
        for (let sorteo of sorteos) {
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
          }
          this.sorteos.push(sorteoAux);
        }
        console.log("Lista de sorteos por Rifa");
        console.log(this.sorteos);
        this.dataSource = this.sorteos;
      }
    });

  }
  Editar(obj: any) {
    localStorage.setItem("idSorteo", obj.sorteo_id.toString());
    //let id = localStorage.getItem("idRifa");
    this.pantalla = 'pantalla_form_sorteo_edit';
    this.avisarComponentePadre();
  }

  avisarComponentePadre() {
    console.log("Aviso a PADRE");
    this.mostrar.emit(this.pantalla);
  }

  Eliminar(obj: any) {
    var idSorteo = obj.sorteo_id;
    var idx = this.sorteos.indexOf(obj);
    //console.log("index: " + idx);
    if (confirm("Realmente quiere borrarlo? ")) {
      this._sorteoService.delete(Number(idSorteo)).subscribe((response: any) => {
        let status = response.status;
        if (response.status == 'success') {
          this.showSuccessMessage();
          // splice primer parametro desde donde quiero eliminar y segundo cantidad de elementos
          this.dataSource.splice(idx, 1);
          this.tabla1.renderRows();
        } else {
          console.log(response.message);
          this.showErrorMessage(response.message);
        }
      }, error => {
        console.error('Error al borrar:', error);
        this.showErrorMessage(error.error.message);
      });
    }

  }

  pageEvent(page: any) {
    //this.pageIndex = page.pageIndex;
  }

  showErrorMessage(mensaje: string) {
    this.snackBar.open('El sorteo no se pudo borrar: ' + mensaje, 'Cerrar', {
      duration: 2000,
    });
  }

  showSuccessMessage() {
    this.snackBar.open('Sorteo se borro con éxito', 'Cerrar', {
      duration: 2000,
    });
  }

}
