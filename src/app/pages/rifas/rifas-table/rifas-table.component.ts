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
import { RifaService } from '../../../services/rifa.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Rifa } from 'src/app/models/rifa.model';
import { MatTable } from '@angular/material/table';

const ELEMENT_DATA: Rifa[] = [];

@Component({
  selector: 'app-rifas-table',
  templateUrl: './rifas-table.component.html',
  styleUrls: ['./rifas-table.component.scss'],
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
export class RifasTableComponent implements OnInit {
  public organizador: any = null;
  today: Date = new Date();

  public rifaIni: Rifa = {
    id: 0, fecha_inicio: this.today, nombre: '', descripcion: '', organizador: this.organizador
  };

  public rifaselect: Rifa = this.rifaIni;
  public rifa: Rifa;
  rifaList: Rifa[] = [];
  public rifas: any = [];

  public pasajero: any;
  public loading: boolean = false;
  public totalPersonas: number = 0;
  public pageIndex = 0;
  public selectedSexo = 'todos';
  public desdeValue: any = 0;
  public hastaValue: any = 0;
  public termino: string = '';
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) tabla1!: MatTable<Rifa>;
  @Output() mostrar = new EventEmitter<string>();

  columnas: string[] = ['Id', 'Fecha', 'Nombre', 'Organizador', 'Actions'];
  dataSource = ELEMENT_DATA;

  visible = false;
  pantalla = '';

  constructor(
    private _rifasService: RifaService,
    public router: Router,
    private snackBar: MatSnackBar
  ) {
    this.rifa = {
      id: 1, fecha_inicio: this.today, nombre: '', descripcion: '', organizador: this.organizador
    }
  }

  async ngOnInit() {
    localStorage.setItem("idRifa", '');
    await this.getRifas();
    //this.loading = true;
  }

  announceSortChange(event: any) {
  }

  getRifas() {
    console.log("Dentro de getRIfas");
    this._rifasService
      .getRifasActivas()
      .subscribe((response: any) => {
        let status = response.status;

        if (status != 'success') {
          status = 'error';
        }

        if (status == 'success') {
          console.log("success");
          let rifas = response.data;
          let rifaAux;
          console.log(rifas);
          for (let rifa of rifas) {
            console.log('Fecha: ' + rifa.rifa_fecha_inicio);
            console.log(typeof (rifa.rifa_fecha_inicio));
            rifaAux = {
              rifa_id: Number(rifa.rifa_id),
              organizador_id: Number(rifa.organizacion_id),
              organizador_nombre: rifa.organizador_nombre,
              rifa_nombre: rifa.rifa_nombre,
              rifa_descripcion: rifa.rifa_descripcion,
              rifa_fechaInicio: rifa.rifa_fecha_inicio,
              rifa_fechaFin: rifa.rifa_fecha_fin

            }
            console.log(rifaAux);
            this.rifas.push(rifaAux);
          }
          console.log("Array rifas");
          console.log(this.rifas);
          this.dataSource = this.rifas;
          this.loading = false;
        }
      });
  }

  pageEvent(page: any) {
    // console.log("VALOR INDEX PAGE EN PERSONAS: " + this.pageIndex);
    this.pageIndex = page.pageIndex;
  }

  sexoChange(event: any) {
    this.selectedSexo = event.value;
  }

  crearRifa() {
    localStorage.setItem("idRifa", '');
    this.pantalla = 'pantalla_form_rifa';
    this.avisarComponentePadre();
  }

  avisarComponentePadre() {
    console.log("Aviso a PADRE");
    this.mostrar.emit(this.pantalla);
  }

  filter() {
    this.pageIndex = 0;
    this.paginator.firstPage();
    //console.log("Termino: " + this.termino + " Sexo: " + this.selectedSexo + " desde: " + this.desdeValue + " hasta: " + this.hastaValue);
    this.pageIndex = 0;
  }
  Asignar(obj: any) {
    //console.log("Rifa ID seleccionada: " + obj.rifa_id);
    localStorage.setItem("idRifa", obj.rifa_id.toString());
    let id = localStorage.getItem("idRifa");
    //this.router.navigate(["/dashboard/personas/persona-tab"]);
    this.pantalla = 'pantalla_form_sorteo';
    this.avisarComponentePadre();
    /*console.log("obj:");
    console.log(obj);
    console.log("ID RIFA SELECCIONADA:");
    console.log(id);*/
  }

  Editar(obj: any) {
    localStorage.setItem("idRifa", obj.rifa_id.toString());
    //let id = localStorage.getItem("idRifa");
    this.pantalla = 'pantalla_form_rifa';
    this.avisarComponentePadre();
  }



  Eliminar(obj: any) {
    var idRifa = obj.rifa_id;
    var idx = this.rifas.indexOf(obj);
    //console.log("index: " + idx);
    if (confirm("Realmente quiere borrarlo? También se borraran todos los sorteos!!!")) {

      this._rifasService.delete(Number(idRifa)).subscribe((response: any) => {
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

  showErrorMessage(mensaje: string) {
    this.snackBar.open('La rifa no se pudo borrar: ' + mensaje, 'Cerrar', {
      duration: 2000,
    });
  }

  showSuccessMessage() {
    this.snackBar.open('Rifa borro con éxito', 'Cerrar', {
      duration: 2000,
    });
  }

}
