
import { Viaje } from 'src/app/models/viaje.model';
import { ViajeService } from '../../../services/viaje.service';
import { PasajeroService } from '../../../services/pasajero.service';

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
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogElegirContenidoFormComponent } from '../../dialog/dialog-elegir-contenido-form/dialog-elegir-contenido-form.component';

const ELEMENT_DATA: Viaje[] = [];

@Component({
  selector: 'app-viajes-table',
  templateUrl: './viajes-table.component.html',
  styleUrls: ['./viajes-table.component.scss']
})
export class ViajesTableComponent implements OnInit {
  today: Date = new Date();

  public auxViaje: any;
  public viajeIni: Viaje = {
    id: 0, fecha_inicio: this.today, nombre: '', descripcion: ''
  };

  public viajeselect: Viaje = this.viajeIni;
  public viaje: Viaje;
  viajeList: Viaje[] = [];
  public viajes: any = [];

  public loading: boolean = false;
  public totalViajes: number = 0;
  public pageIndex = 0;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) tabla1!: MatTable<Viaje>;
  //@Output() mostrar = new EventEmitter<string>();

  columnas: string[] = ['Id', 'Fecha_ini', 'Nombre', 'Actions'];
  dataSource = ELEMENT_DATA;

  visible = false;
  pantalla = '';

  constructor(private _viajeService: ViajeService,
    public router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    //Cargo lista de viajes
    this.getViajesActivos();
  }

  pageEvent(page: any) {
    // console.log("VALOR INDEX PAGE EN PERSONAS: " + this.pageIndex);
    this.pageIndex = page.pageIndex;
  }

  getViajesActivos() {
    this._viajeService.getViajesActivosList().subscribe((response: any) => {
      let status = response.status;
      //console.log(response.data);
      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        console.log("TABLA de viajes:");
        console.log(response.data);
        let viajes = response.data;
        let viajeAux;
        for (let viaje of viajes) {
          viajeAux = {
            viaje_id: Number(viaje.id),
            viaje_nombre: viaje.Nombre,
            viaje_fecha_ini: viaje.FechaInicio,
            viaje_fecha_fin: viaje.FechaFin,
            grupos: viaje.Grupos
          }
          this.viajes.push(viajeAux);
        }
        console.log("Viajes con tamano de grupos");// 0 sin grupos // 1 solo tiene uno
        console.log(this.viajes)

        this.dataSource = this.viajes;
        this.loading = false;
      }

      if (status == 'error') {
        console.error('Error:', response);
      }

    }, error => {
      console.error('Error:', error);
      //this.showErrorMessage();
    });

  }

  avisarComponentePadre() {
    console.log("Aviso a PADRE");
    //this.mostrar.emit(this.pantalla);
  }

  Generar(viaje: any) {
    console.log("Viaje: ");
    console.log(viaje);
    //console.log("Rifa ID seleccionada: " + obj.rifa_id);
    //window.open('https://formularioinscripcion.detoqueytoque.com/viaje/' + obj.viaje_id, '_blank');

    this.auxViaje = {
      id_viaje: Number(viaje.viaje_id),
      nombre: viaje.viaje_nombre,
      fecha_inicio: viaje.viaje_fecha_ini,
      fecha_fin: viaje.viaje_fecha_fin,
      descripcion: '',
      grupos: viaje.grupos,
    }
    console.log("Viaje seleccionado: ");
    console.log(this.viaje);

    // Dialogo
    let idViaje = viaje.viaje_id;
    this.openDialogContenidoForm(idViaje);

  }

  openDialogContenidoForm(idViaje: number): void {
    const dialogRef = this.dialog.open(DialogElegirContenidoFormComponent, {
      width: '434px',
      data: {
        idViaje: idViaje
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.evento === 'confirm') {
        //this.refreshPage();
        console.log('Se acepto');
        console.log('Itinerario Seleccionado: ');
        console.log(result.itinerario);
        console.log(typeof result.itinerario);
        console.log('Sena seleccionada');
        console.log(result.sena);

        //Generar formulario
        /*viajeAux = {
          viaje_id: Number(viaje.id),
          viaje_nombre: viaje.Nombre,
          viaje_fecha_ini: viaje.FechaInicio,
          viaje_fecha_fin: viaje.FechaFin
        }*/
        let idGrupo = 0;
        //Si el viaje tiene un grupo paso el ID por parametro
        if (this.auxViaje.grupos.length == 1) {
          idGrupo = this.auxViaje.grupos[0].id;
        }

        var viaje: any = { id: this.auxViaje.id_viaje, Nombre: this.auxViaje.nombre, sena: result.sena, grupo: idGrupo };

        if (result.itinerario) {
          result.itinerario.sena = result.sena;
          result.itinerario.viaje_id = this.auxViaje.id_viaje;
          //window.open('http://localhost:59818/itinerario/' + JSON.stringify(result.itinerario), '_blank');
          window.open('https://formularioinscripcion.detoqueytoque.com/itinerario/' + JSON.stringify(result.itinerario), '_blank');
        } else {
          //window.open('http://localhost:59818/viaje/' + JSON.stringify(viaje), '_blank');
          window.open('https://formularioinscripcion.detoqueytoque.com/viaje/' + JSON.stringify(viaje), '_blank');
        }

      }
      if (result.evento === 'cancel') {
        //alert('Se cancelo');
        console.log('Se cancelo');
      }
    });

  }

  /*verFormulario() {
    if (this.idViaje != 0) {
      //Tengo que abrir una session para USUARIOS
      this.loginFree();
      //this.router.navigate(['/formularioInscripcion', this.idViaje],{ skipLocationChange: true })
      //window.location.href = 'https://formularioinscripcion.detoqueytoque.com/viaje/'+this.idViaje;
      window.open('https://formularioinscripcion.detoqueytoque.com/viaje/'+this.idViaje, '_blank');
    } else {

      const msg = "Debes seleccionar un viaje";
      this.showErrorMessage(msg);
    }

  }*/

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
