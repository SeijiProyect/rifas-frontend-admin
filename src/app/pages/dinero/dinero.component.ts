
export interface DialogData {
  descripcion: string;
  monto: number;
}

import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { Itinerario } from 'src/app/models/itinerario.model';
import { Pasajero } from 'src/app/models/pasajero.model';
import { CostoExtraService } from 'src/app/services/costoExtra.service';
import { PasajeroService } from 'src/app/services/pasajero.service';
import { EliminarCostoDialogComponent } from '../eliminar-costo-dialog/eliminar-costo-dialog.component';
import { AgregarCostoDialogComponent } from '../agregar-costo-dialog/agregar-costo-dialog.component';
import { DepositosListPasajeroComponent } from '../depositos/depositos-list-pasajero/depositos-list-pasajero.component';

@Component({
  selector: 'app-dinero',
  templateUrl: './dinero.component.html',
  styleUrls: ['./dinero.component.scss'],
})

export class DineroComponent implements OnInit {

  @ViewChild(DepositosListPasajeroComponent) hijo!: DepositosListPasajeroComponent;
  today: Date = new Date();
  public idPasajero: number = 0;

  acompanante: Pasajero = {
    id: 0,
    estado: '',
    comentarios: '',
  };

  itinerario: Itinerario = {
    id: 0,
    precio: 0
  };

  pasajero: Pasajero = {
    id: 0,
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
  public pasajeros: any;
  public loading: boolean = false;
  public pasajerosLoading: boolean = true;
  public totalDepositos: number = 0;
  public pageIndex = 0;
  public selectedTipo = 'todos';
  public selectedPasajero = 'todos';
  public desdeValue: any;
  public hastaValue: any;
  public termino: string = '';
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = [];
  public costosExtraSumados: number = 0;
  public costosExtraPositivosSumados: number = 0;
  public costosExtraNegativosSumados: number = 0;
  public recaudado_extra_negativo_total: number = 0;

  // ATRIBUTOS CALCULO DETALLE
  public deposito_total: number = 0;
  public rifas_registrado: number = 0;
  public rifas_recaudado: number = 0;
  public pago_personal_total: number = 0;
  public recaudado_total: number = 0;
  public registro_total: number = 0;

  constructor(
    private _costoExtraService: CostoExtraService,
    private _pasajeroService: PasajeroService,
    private dialog: MatDialog,

  ) { }

  ngOnInit() {
    let id_pas = localStorage.getItem("idPasajero");
    if (id_pas != null) {
      this.cargarDineroPasajero(Number(id_pas));
    }
  }

  cargarDineroPasajero(idPasajero: number) {
    this.pasajero.id = idPasajero;
    this.getItinerarioByPasajeroId(Number(idPasajero));
    this.getCostosExtrasByPasajeroId(Number(idPasajero));
    this.getDepositosByPasajeroId(Number(idPasajero));
    this.hijo.getDepositosByPasajeroId(Number(idPasajero));
  }

  /*getPasajeroByPersonaId(idPersona: number) {
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
        this.getDepositosByPasajeroId(Number(id_pas));
      }
    });

  }*/

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
          /* console.log("costos extras: ");
           console.log(this.costos);*/
          let costosExtraPositivo: number = 0;
          let costosExtraNegativo: number = 0;
          for (let index = 0; index < this.costos.length; index++) {
            const monto = Number(this.costos[index].Monto);
            //console.log("Vlor costo extra");
            //console.log(this.costos[index].Monto);
            if (this.costos[index].Monto > 0) {
              costosExtraPositivo += this.costos[index].Monto;
            } else {
              costosExtraNegativo += this.costos[index].Monto;
            }
          }

          this.costosExtraPositivosSumados = costosExtraPositivo;
          this.costosExtraNegativosSumados = costosExtraNegativo;

          console.log("Valor extras:");
          console.log(this.costosExtraPositivosSumados);
          console.log(this.costosExtraNegativosSumados);

        }
      });
  }

  getDepositosByPasajeroId(idPasajero: number) {
    console.log("Id pasajero List depositos: " + idPasajero);
    this._pasajeroService
      .getDepositosByPasajeroId(idPasajero)
      .subscribe((response: any) => {
        let status = response.status;

        if (status != 'success') {
          status = 'error';
        }

        if (status == 'success') {
          this.depositos = response.data;
          this.calcularDetalles();
        }
      });
  }

  eliminarCosto(costoParametro: any) {
    var idCosto = costoParametro.id;
    this._costoExtraService.delete(Number(idCosto)).subscribe((response: any) => {
      let status = response.status;
      if (status != 'success') {
        status = 'error';
      }
      if (status == 'success') {
        //remove costo extra de lista de costos
        const index = this.costos.findIndex((costo: { id: any; }) => costo.id === idCosto);
        if (index !== -1) {
          const deletedCostoPrecio = Number(this.costos[index].Monto);
          /*  console.log("Extra Borrar: ");
            console.log(this.costos[index]); */

          if (deletedCostoPrecio > 0) {
            this.costosExtraPositivosSumados -= deletedCostoPrecio;
          } else {
            this.costosExtraNegativosSumados -= deletedCostoPrecio;
          }

          this.costos.splice(index, 1);
        }
        this.calcularTotales();
      }
    });
  }

  calcularTotales() {
    this.totalCosto = this.costosExtraPositivosSumados + this.itinerario_precio;
    this.recaudado_extra_negativo_total = (-1) * (this.costosExtraNegativosSumados) + this.recaudado_total;
    //return;
  }

  calcularDetalles() {
    this.rifas_registrado = 0;
    this.pago_personal_total = 0;
    this.deposito_total = 0;
    this.rifas_recaudado = 0;


    for (let deposito of this.depositos) {
      this.rifas_registrado += Number(deposito.talones_total);
      this.pago_personal_total += Number(deposito.pagoPersonal_total);
      this.deposito_total += Number(deposito.monto);
      this.rifas_recaudado += Number(deposito.talones_recaudado_total);
    }
    this.recaudado_total = Number(this.rifas_recaudado) + Number(this.pago_personal_total);
    this.registro_total = Number(this.rifas_registrado) + Number(this.pago_personal_total);
    // console.log("Valor recaudado de Rifas: " + this.rifas_recaudado);
  }

  openConfirmDialog(costo: any): void {
    const dialogRef = this.dialog.open(EliminarCostoDialogComponent, {
      width: '250px',
      data: costo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.eliminarCosto(costo);
      }
    });
  }

  add(descripcion: string, monto: number) {
    var idPas = this.pasajero.id;
    var descripcion = descripcion;
    var monto = monto;

    this._costoExtraService.add(Number(idPas), descripcion, monto).subscribe((response: any) => {

      let status = response.status;

      if (status != 'success') {
        //console.log("Errorrrrrr");
        status = 'error';
      }

      if (status == 'success') {
        /* console.log("costo extra agregado");
         console.log(response.data);*/
        const nuevoCosto = {
          id: response.data.id,
          Descripcion: response.data.Descripcion,
          Monto: response.data.Monto,
        };

        if (nuevoCosto.Monto > 0) {
          this.costosExtraPositivosSumados += nuevoCosto.Monto;
        } else {
          this.costosExtraNegativosSumados += nuevoCosto.Monto;
        }

        this.costos.push(nuevoCosto);
        this.calcularTotales()
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AgregarCostoDialogComponent, {
      data: { monto: this.monto, descripcion: this.descripcion },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.add(result.descripcion, result.monto);
      }
    });

  }
}


