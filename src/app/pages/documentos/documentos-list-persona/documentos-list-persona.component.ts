import { Viaje } from 'src/app/models/viaje.model';
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
import { DocumentoService } from 'src/app/services/documento.service';
import { environment } from 'src/environments/environment';

const ELEMENT_DATA: Viaje[] = [];
@Component({
  selector: 'app-documentos-list-persona',
  templateUrl: './documentos-list-persona.component.html',
  styleUrls: ['./documentos-list-persona.component.scss']
})
export class DocumentosListPersonaComponent implements OnInit {
  public idPersona = '';
  public idPasajero = '';
  today: Date = new Date();

  public viajeIni: Viaje = {
    id: 0, fecha_inicio: this.today, nombre: '', descripcion: ''
  };

  public viajeselect: Viaje = this.viajeIni;
  public viaje: Viaje;
  viajeList: Viaje[] = [];
  public documentos: any = [];
  public archivos: any = [];
  //ruta_archivo = "";

  public loading: boolean = false;
  public totalViajes: number = 0;
  public pageIndex = 0;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) tabla1!: MatTable<Viaje>;
  //@Output() mostrar = new EventEmitter<string>();

  columnas: string[] = ['Id', 'Numero', 'Fecha_exp', 'Fecha_ven', 'Tipo', 'Pais', 'Actions'];
  dataSource = ELEMENT_DATA;

  visible = false;
  pantalla = '';

  constructor(private _documentoService: DocumentoService,
    public router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    //Cargo lista de documentos
    let id = localStorage.getItem("idPersona");
    // INICIALIZAR PRIMERO LA SELECCION ANTES DE CARGAR EL COMBO BOX
    let id_pas = localStorage.getItem("idPasajero");
    if (id_pas != null) {
      this.idPasajero = id_pas;
      this.getDocumentosByPasajero(Number(this.idPasajero));
    }

  }

  pageEvent(page: any) {
    // console.log("VALOR INDEX PAGE EN PERSONAS: " + this.pageIndex);
    this.pageIndex = page.pageIndex;
  }

  getDocumentosByPasajero(idPasajero: number) {
    this.documentos = [];
    this._documentoService.getDocumentosPorPasajero(Number(idPasajero)).subscribe((response: any) => {
      let status = response.status;
      //console.log(response.data);
      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        // console.log("pasajero: " + this.idPasajero);
        console.log("TABLA de documentos:");
        //console.log(response.data);
        let documentos = response.data;
        let documentoAux;
        for (let documento of documentos) {
          documentoAux = {
            documento_id: Number(documento.id),
            documento_numero: documento.numero,
            documento_fecha_expedicion: documento.fecha_expedicion,
            documento_fecha_vencimiento: documento.fecha_vencimiento,
            documento_pais: documento.pais,
            documento_tipo: documento.tipo,
          }
          this.documentos.push(documentoAux);
        }
        /* console.log("LIstado documentos: ");
         console.log(this.documentos);*/
        this.dataSource = this.documentos;
        this.loading = false;
      }

      if (status == 'error') {
        console.error('Error:', response);
        this.dataSource = [];
      }

    }, error => {
      console.error('Error:', error);
      this.dataSource = [];
      //this.showErrorMessage();
    });

  }

  getDocumentosByPersona() {
    this._documentoService.getDocumentosPorPersona(Number(this.idPersona)).subscribe((response: any) => {
      let status = response.status;
      //console.log(response.data);
      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        console.log("TABLA de documentos:");
        console.log(response.data);
        let documentos = response.data;
        let documentoAux;
        for (let documento of documentos) {
          documentoAux = {
            documento_id: Number(documento.id),
            documento_numero: documento.numero,
            documento_fecha_expedicion: documento.fecha_expedicion,
            documento_fecha_vencimiento: documento.fecha_vencimiento,
            documento_pais: documento.pais,
            documento_tipo: documento.tipo,

          }
          this.documentos.push(documentoAux);
        }

        console.log("LIstado documentos: ");
        console.log(this.documentos);

        this.dataSource = this.documentos;
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

  getArchivosPorDocumento(idDocumento: number, tipo: string) {
    this.archivos = [];
    this._documentoService.getArchivosPorDocumento(Number(idDocumento)).subscribe((response: any) => {
      let status = response.status;
      //console.log(response.data);
      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        console.log("ARCHIVOS de documento:");
        console.log(response.data);
        let archivos = response.data;
        let archivoAux;
        for (let archivo of archivos) {
          archivoAux = {
            id: Number(archivo.id),
            nombre: archivo.nombre,
            tipo: archivo.tipo,
            url: archivo.url,
          }
          this.archivos.push(archivoAux);
        }
        console.log("LIstado archivos: ");
        console.log(this.archivos);

        /*  let ruta_doc = "https://api-rifas.dev.detoqueytoque.com/assets/imgs/persona/"
            + this.idPersona + "/documento/" + obj.documento_tipo;*/

        //this.ruta_archivo = this.ruta_archivo + tipo;
        this.archivos;
        for (let item of this.archivos) {
          //this.aux_lote_talones.push(item);
          //console.log("VALOR cadena URL:");
          //console.log(item.url);
          var posicionCaracter = item.url.indexOf("assets");
          //console.log(item.url.substring(posicionCaracter, item.url.length));
          let ruta_assets = item.url.substring(posicionCaracter, item.url.length);
          window.open(environment.url + "/" + ruta_assets, '_blank');
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

  avisarComponentePadre() {
    console.log("Aviso a PADRE");
    //this.mostrar.emit(this.pantalla);
  }
  ver(obj: any) {
    //console.log("Rifa ID seleccionada: " + obj.rifa_id);
    //Buscar archivos para ese documento
    let id = obj.documento_id;
    let tipo = obj.documento_tipo;
    // this.ruta_archivo = this.ruta_archivo + obj.documento_tipo;

    this.getArchivosPorDocumento(Number(id), tipo);
    //https://api-rifas.dev.detoqueytoque.com/assets/imgs/persona/1552/foto/66573fa74a6d3.png
    /*let ruta_doc = "https://api-rifas.dev.detoqueytoque.com/assets/imgs/persona/"
      + this.idPersona + "/documento/" + obj.documento_tipo;*/


    /* this.archivos;
     for (let item of this.archivos) {
       //this.aux_lote_talones.push(item);
       window.open(ruta_doc + "/" + item.nombre, '_blank');
     }*/

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
