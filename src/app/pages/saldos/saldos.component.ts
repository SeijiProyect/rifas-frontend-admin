import { Component, OnInit, ViewChild, Injectable, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort, Sort } from '@angular/material/sort';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { MatPaginator } from '@angular/material/paginator';
import { PasajeroService } from 'src/app/services/pasajero.service';
import { ViajeService } from 'src/app/services/viaje.service';
import { GlobalService } from 'src/app/common/global.service';

import { Pasajero } from 'src/app/models/pasajero.model';
import { Persona } from 'src/app/models/persona.model';

import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ItinerarioService } from 'src/app/services/itinerario.service';
import { Itinerario } from 'src/app/models/itinerario.model';
import { CostoExtraService } from 'src/app/services/costoExtra.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';



const ELEMENT_DATA: Pasajero[] = [];

@Component({
  selector: 'app-saldos',
  templateUrl: './saldos.component.html',
  styleUrls: ['./saldos.component.scss'],
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

export class SaldosComponent implements OnInit {

  porcentaje_saldo: number = 0;
  updateSettingSlider(event: any) {
    this.porcentaje_saldo = event.value;
    //console.log("Valor slider porcentaje saldo: " + this.porcentaje_saldo);
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + '%';
    }
    return value;
  }

  public personaIni: Persona = {
    id: 0, nombres: '', apellidos: '', cedula: '', celular: '', direccion: '', sexo: '', email: ""
  };

  public itinerarioIni: Itinerario = {
    id: 0,
    precio: 0
  };

  public pasajeroIni: Pasajero = {
    id: 0, persona: this.personaIni, itinerario: this.itinerarioIni, univesidad: '', estado: '', comentarios: ''
  };

  public pasajeroselect: Pasajero = this.pasajeroIni;
  pasajeroList: Pasajero[] = [];
  public pasajeros: any;
  public persona: Persona;

  public status = '';
  public costosExtras: any;

  public viajes: any;
  public itinerarios: any;
  public loading: boolean = false;
  public totalPasajeros: number = 0;
  public pageIndex = 0;
  public selectedSatus = 'todos';
  public selectedViaje = 'todos';
  public selectedItinerario = 'todos';
  public desdeValue: any;
  public hastaValue: any;
  public termino: string = '';
  public filtradoEsVerdadero: boolean = false;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  columnas: string[] = ['Id', 'Nombre', 'Celular', 'Email', 'Itinerario', 'CostoTotal', 'RecaudadoTotal', 'Resumen'];
  dataSource = ELEMENT_DATA;

  today: Date = new Date();
  public idPasajero: number = 0;

  acompanante: Pasajero = {
    id: 0,
    estado: '',
    comentarios: '',
  };

  public itinerario!: Itinerario;

  pasajero: Pasajero = {
    id: 0,
    nombre: '',
    apellido: '',
    itinerario: this.itinerario,
    univesidad: '',
    acompaniante: '',
    estado: '',
    comentarios: '',
  };

  public descripcion: string = '';
  public monto: number = 0;

  public itinerario_precio: number = 0;
  public costos: any;
  public totalCosto: number = 0;
  public costoSuma: number = 0;
  public depositos: any;
  public pasajerosLoading: boolean = true;
  public totalDepositos: number = 0;
  public selectedTipo = 'todos';
  public selectedPasajero = 'todos';

  public costosExtraSumados: number = 0;
  public costosExtraPositivosSumados: number = 0;
  public costosExtraNegativosSumados: number = 0;

  // ATRIBUTOS CALCULO DETALLE
  public deposito_total: number = 0;
  public rifas_registrado: number = 0;
  public rifas_recaudado: number = 0;
  public pago_personal_total: number = 0;
  public recaudado_total: number = 0;
  public registro_total: number = 0;

  constructor(
    private _pasajeroService: PasajeroService,
    private _viajeService: ViajeService,
    private _itinerarioService: ItinerarioService,
    public globalService: GlobalService,
    private _costoExtraService: CostoExtraService,
    /* private exportAsService: ExportAsService, */
    public router: Router
  ) {

    this.pasajero = {
      id: 0, nombre: '',/* persona: this.personaIni, */ itinerario: this.itinerarioIni, univesidad: '', estado: '', comentarios: '',
      /*costoTotal: 0, recaudadoTotal: 0, diferencia:0*/
    };

    this.persona = {
      id: 1, nombres: 'inicial', apellidos: 'inicial', cedula: 'inicial', celular: 'inicial',
      direccion: 'inicial', sexo: 'inicial', email: "inicial"
    };
  }

  public resultadosFiltrados: any[] = [];

  async ngOnInit() {
    await this.getViajes();
    await this.getItinerarios();
    this.loading = true;
    /* let id = localStorage.getItem("idPersona");
     if (id != null) {
       this.getPasajeroByPersonaId(Number(id));
     }*/
  }

  datosPasajero(idPersona: any) {
    //console.log("Persona seleccionada: " + obj);
    localStorage.setItem("idPersona", idPersona.toString());
    let id = localStorage.getItem("idPersona");
    this.router.navigate(["/dashboard/personas/persona-tab"]);
    console.log("Id Persona:");
    console.log(idPersona);

  }

  /*
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
          this.getItinerarioByPasajeroId(Number(id_pas));
          this.getCostosExtrasByPasajeroId(Number(id_pas));
          this.getCostosExtrasPositvosByPasajeroId(Number(id_pas));
          this.getRecaudadoTotal(Number(id_pas));
        }
      });
  
    }*/
  /*
    getItinerarioByPasajeroId(idPasajero: number) {
      this._pasajeroService
        .getItinerarioByPasajeroId(idPasajero)
        .subscribe((response: any) => {
          let status = response.status;
  
          if (status != 'success') {
            status = 'error';
          }
  
          if (status == 'success') {
            this.itinerario = response.data['itinerario'];
            let precio = 0;
            if (this.itinerario.precio == undefined) {
              this.itinerario_precio = precio;
            } else {
              this.itinerario_precio = this.itinerario.precio;
            }
          }
        });
    }
  
    getCostosExtrasByPasajeroId(idPasajero: number) {
      this._pasajeroService
        .getCostosExtrasByPasajeroId(idPasajero)
        .subscribe((response: any) => {
          let status = response.status;
  
          if (status != 'success') {
            status = 'error';
          }
  
          if (status == 'success') {
            this.costos = response.data;
            //console.log("this.costos: ");
            //console.log(this.costos);
            let costosExtra: number = 0;
  
            for (let index = 0; index < this.costos.length; index++) {
              if (this.costos[index].Monto > 0) {
                const monto = Number(this.costos[index].Monto);
                costosExtra = costosExtra + monto;
                this.costosExtraPositivosSumados = costosExtra;
              }
            }
  
          }
        });
    }
  */
  /*
    getCostosExtrasPositvosByPasajeroId(idPasajero: number) {
      this._pasajeroService
        .getCostosExtrasByPasajeroId(idPasajero)
        .subscribe((response: any) => {
          let status = response.status;
  
          if (status != 'success') {
            status = 'error';
          }
  
          if (status == 'success') {
            this.costos = response.data;
            //console.log("this.costos: ");
            //console.log(this.costos);
            let costosExtra: number = 0;
  
            for (let index = 0; index < this.costos.length; index++) {
              const monto = Number(this.costos[index].Monto);
              if (monto >= 0) {
                costosExtra = costosExtra + monto;
                this.costosExtraPositivosSumados = costosExtra;
              }
  
            }
  
          }
        });
    }*/

  /* getRecaudadoTotal(idPasajero: number) {
     this._pasajeroService
       .getCostosExtrasByPasajeroId(idPasajero)
       .subscribe((response: any) => {
         let status = response.status;
 
         if (status != 'success') {
           status = 'error';
         }
 
         if (status == 'success') {
           this.costos = response.data;
           let costosExtra: number = 0;
 
           for (let index = 0; index < this.costos.length; index++) {
             const monto = Number(this.costos[index].Monto);
             if (monto <= 0) {
               costosExtra = costosExtra + monto;
               this.costosExtraNegativosSumados = costosExtra;
             }
           }
 
         }
       });
   }*/

  /* recaudadoTotal(): number {
     let saldo = 0;
     saldo = (-1) * (this.costosExtraNegativosSumados) + this.recaudado_total;
     return Number(saldo);
   }*/

  announceSortChange(event: any) {
    console.log(event);
  }

  getViajes() {
    this.loading = true;
    this._viajeService.getViajesList().subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        this.viajes = response.data;
      }
      this.loading = false;
    });
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

  getItinerarioByViaje() {
    this.loading = true;
    var idViaje = Number(this.selectedViaje);

    this._itinerarioService.getItinerariosByViaje(idViaje).subscribe((response: any) => {
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

  statusChange(event: any) {
    this.selectedSatus = event.value;
  }

  viajeChange(event: any) {
    this.selectedViaje = event.value;
    //cambiar combo box itinerario
    //console.log("Valor de seleccion de viaje: " + this.selectedViaje);
    if (this.selectedViaje != 'todos') {
      this.getItinerarioByViaje();
    } else {
      this.selectedItinerario = 'todos';
    }

  }

  itinerarioChange(event: any) {
    this.selectedItinerario = event.value;

  }

  filtradoIsTrue() {
    this.filtradoEsVerdadero = true;
  }

  filter() {
    console.log("FUNCION: FILTRO");
    /*console.log("Viaje seleccionado: " + this.selectedViaje);
    console.log("Porcentaje seleccionado: " + this.porcentaje_saldo);
    console.log("tinerario seleccionado: " + this.selectedItinerario);*/

    if (this.selectedViaje == 'todos' && this.porcentaje_saldo == 0) {
      // Sin condiciones de filtro
      alert("Debes ingresar una condición de Filtro!!");

    } else {
      if (this.selectedViaje != 'todos' && this.porcentaje_saldo != 0 && this.selectedItinerario == 'todos') {
        // filtro por viaje y porcentaje
        console.log("Filtro saldos por VIAJE - PORCENTAJE");
        this.getPasajerosSaldosByViajeAndPorcentaje();
      } else {
        // filtro por itinerario
        if (this.selectedItinerario != 'todos') {
          if (this.porcentaje_saldo != 0) {
            console.log("Filtro saldos por ITINERARIO - PORCENTAJE");
            this.getPasajerosSaldosByItinerarioAndPorcentaje();
          } else {
            console.log("Filtro saldos por ITINERARIO");
            this.getPasajerosSaldosByItinerario();
          }
        } else {
          // Contiene solo el viaje
          this.getPasajerosSaldosByViaje();
          console.log("Filtro por VIAJE");
        }
      }
    }

  }

  filtrarNuevamente(): void {
    let coincidencia;
    this.resultadosFiltrados.filter((item) => {

      return item.nombre.includes(this.termino);

    });
    if (this.termino) {
      for (let i = 0; i < this.resultadosFiltrados.length; i++) {
        if (this.resultadosFiltrados[i].nombre.includes(this.termino)) {
          coincidencia = this.resultadosFiltrados[i];

          console.log(coincidencia);
        }
      }
    }
    console.log(this.termino);
    console.log(this.resultadosFiltrados);
    console.log(coincidencia);
  }

  excedeLongitud(itinerario: string): boolean {
    return itinerario.length > 20;
  }

  exportToExcel(): void {
    const filteredData = this.dataSource;
    /* console.log("this.dataSource: ");
     console.log(this.dataSource);*/
    const dataToExport = filteredData.map((item: any) => {
      return {
        Id: item.id,
        Nombre: item.nombre + ' ' + item.apellido,
        Celular: item.celular,
        Email: item.email,
        Itinerario: item.itinerario,
        Costo_total: item.costoTotal,
        Recaudado_total: item.recaudadoTotal,
        Saldo: item.diferencia * (-1),
      };
    });

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'tabla.xlsx');
  }

  getPasajerosSaldosByViaje() {
    console.log("Filtro: getPasajerosSaldosByViaje() ");
    this.loading = true;
    this._pasajeroService.getPasajerosSaldosByViaje(Number(this.selectedViaje)).subscribe((response: any) => {
      let status = response.status;
      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        this.pasajeroList = [];
        this.pasajeros = response.data;
        this.totalPasajeros = response.totalPasajeros;
        let list = response.data;

        console.log("response.data: ");
        console.log(response.data);

        for (let i = 0; i < this.pasajeros.length; i++) {
          // console.log("Block statement execution no." + i);
          if (list[i] != null) {
            //console.log("Pasajeros: " + list[i]['nombres']);
            let pasajero: any;

            pasajero = {
              id: list[i]['id'],
              persona_id:list[i]['id_persona'],
              nombre: list[i]['nombre'],
              apellido: list[i]['apellido'],
              itinerario: list[i]['itinerario']['nombre'],
              comentarios: '',
              costoTotal: list[i]['costo_total'],
              recaudadoTotal: list[i]['recaudado_total'],
              diferencia: list[i]['diferencia'],
              email: list[i]['email'],
              celular: list[i]['celular'],
            }
            this.pasajeroList.push(pasajero);
          }
        }
        this.dataSource = this.pasajeroList;
      }
      this.loading = false;

    });

  }

  getPasajerosSaldosByItinerarioAndPorcentaje() {
    this.loading = true;
    var idItinerario = Number(this.selectedItinerario);
    var porcentaje = Number(this.porcentaje_saldo);

    this._pasajeroService.getPasajerosSaldosByItinerarioAndPorcentaje(idItinerario, porcentaje).subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        this.pasajeroList = [];
        this.pasajeros = response.data;
        this.totalPasajeros = response.totalPasajeros;
        let list = response.data;

        console.log("response.data: ");
        console.log(response.data);

        for (let i = 0; i < this.pasajeros.length; i++) {
          // console.log("Block statement execution no." + i);
          if (list[i] != null) {
            let pasajero: any;

            pasajero = {
              id: list[i]['id'],
              persona_id:list[i]['id_persona'],
              nombre: list[i]['nombre'],
              apellido: list[i]['apellido'],
              itinerario: list[i]['itinerario']['nombre'],
              comentarios: '',
              costoTotal: list[i]['costo_total'],
              recaudadoTotal: list[i]['recaudado_total'],
              diferencia: list[i]['diferencia'],
              email: list[i]['email'],
              celular: list[i]['celular'],
            }
            this.pasajeroList.push(pasajero);
          }
        }
        this.dataSource = this.pasajeroList;
        this.resultadosFiltrados = this.dataSource;
      }
      this.loading = false;

    });

  }

  getPasajerosSaldosByViajeAndPorcentaje() {
    this.loading = true;
    var idViaje = Number(this.selectedViaje);
    var porcentaje = Number(this.porcentaje_saldo);

    this._pasajeroService.getPasajerosSaldosByViajeAndPorcentaje(idViaje, porcentaje).subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        this.pasajeroList = [];
        this.pasajeros = response.data;
        this.totalPasajeros = response.totalPasajeros;
        let list = response.data;

        console.log("response.data: ");
        console.log(response.data);

        for (let i = 0; i < this.pasajeros.length; i++) {
          // console.log("Block statement execution no." + i);
          if (list[i] != null) {
            //console.log("Pasajeros: " + list[i]['nombres']);
            let pasajero: any;

            pasajero = {
              id: list[i]['id'],
              persona_id:list[i]['id_persona'],
              nombre: list[i]['nombre'],
              apellido: list[i]['apellido'],
              itinerario: list[i]['itinerario']['nombre'],
              comentarios: '',
              costoTotal: list[i]['costo_total'],
              recaudadoTotal: list[i]['recaudado_total'],
              diferencia: list[i]['diferencia'],
              email: list[i]['email'],
              celular: list[i]['celular'],
            }
            this.pasajeroList.push(pasajero);
          }
        }
        this.dataSource = this.pasajeroList;
        this.resultadosFiltrados = this.dataSource;
      }
      this.loading = false;

    });

  }

  getPasajerosSaldosByItinerario() {
    this.loading = true;
    var idItinerario = Number(this.selectedItinerario);

    this._pasajeroService.getPasajerosSaldosByItinerario(idItinerario).subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        this.pasajeroList = [];
        this.pasajeros = response.data;
        this.totalPasajeros = response.totalPasajeros;
        let list = response.data;

        console.log("response.data: ");
        console.log(response.data);

        for (let i = 0; i < this.pasajeros.length; i++) {
          // console.log("Block statement execution no." + i);
          if (list[i] != null) {
            //console.log("Pasajeros: " + list[i]['nombres']);
            let pasajero: any;

            pasajero = {
              id: list[i]['id'],
              persona_id:list[i]['id_persona'],
              nombre: list[i]['nombre'],
              apellido: list[i]['apellido'],
              itinerario: list[i]['itinerario']['nombre'],
              comentarios: '',
              costoTotal: list[i]['costo_total'],
              recaudadoTotal: list[i]['recaudado_total'],
              diferencia: list[i]['diferencia'],
              email: list[i]['email'],
              celular: list[i]['celular'],
            }
            this.pasajeroList.push(pasajero);
          }
        }
        this.dataSource = this.pasajeroList;
        this.resultadosFiltrados = this.dataSource;
      }
      this.loading = false;

    });

  }

}


