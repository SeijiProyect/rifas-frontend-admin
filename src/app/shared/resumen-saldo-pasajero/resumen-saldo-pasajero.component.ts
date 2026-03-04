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


@Component({
  selector: 'app-resumen-saldo-pasajero',
  templateUrl: './resumen-saldo-pasajero.component.html',
  styleUrls: ['./resumen-saldo-pasajero.component.scss']
})
export class ResumenSaldoPasajeroComponent implements OnInit {
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
    let id = localStorage.getItem("idPersona");
    if (id != null) {
      this.getPasajeroByPersonaId(Number(id));
      this.costoTotal();

    }
  }

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
        this.getDepositosByPasajeroId(Number(id_pas));
        this.costoTotal();

      }
    });

  }

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
            if(this.costos[index].Monto > 0) {
            const monto = Number(this.costos[index].Monto);
            costosExtra = costosExtra + monto;
            this.costosExtraPositivosSumados = costosExtra;
          }
        }

        }
      });
  }

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
            if(monto >= 0) {
              costosExtra = costosExtra + monto;
              this.costosExtraPositivosSumados = costosExtra;
            }

          }

        }
      });
  }

  getRecaudadoTotal(idPasajero: number) {
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
            if(monto <= 0) {
              costosExtra = costosExtra + monto;
              this.costosExtraNegativosSumados = costosExtra;
            }
            console.log('costos negativos: ');
            console.log(this.costosExtraNegativosSumados);
          }

        }
      });
  }

  recaudadoTotal():number {
    let saldo = 0;
    saldo = (-1)*(this.costosExtraNegativosSumados) + this.recaudado_total;
    return Number(saldo);
  }

  getDepositosByPasajeroId(idPasajero: number) {
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
          console.log('DEPOSITOS PASAJERO');
          console.log(this.depositos);
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
          // subtract the deleted costo from the costosExtraSumados value
          const deletedCostoPrecio = Number(this.costos[index].precio);
          this.costosExtraSumados -= deletedCostoPrecio;
          this.costos.splice(index, 1);
          // Recalculate the sum of all the remaining costos extras
          let costosExtra = 0;
          for (let index = 0; index < this.costos.length; index++) {
            if(this.costos[index].Monto > 0) {
            const monto = Number(this.costos[index].Monto);
            costosExtra = costosExtra + monto;
            }
          }
          this.costosExtraPositivosSumados = costosExtra;
        }

        console.log("this.costosExtraPositivosSumados: ");
        console.log(this.costosExtraPositivosSumados);
        console.log("total costo: ");
        console.log(this.totalCosto);

        // call costoTotal() to recalculate the total cost
        this.costoTotal();
        console.log("total costo: ");
        console.log(this.totalCosto);
      }
    });
    return costoParametro;
  }

  costoTotal():number {

      let precio: number = 0;

      precio = this.itinerario.precio!

      this.totalCosto = this.costosExtraPositivosSumados + precio;

      return this.totalCosto;

  }

  calcularDetalles() {

    for (let deposito of this.depositos) {
      this.rifas_registrado += Number(deposito.talones_total);
      this.pago_personal_total += Number(deposito.pagoPersonal_total);
      this.deposito_total += Number(deposito.monto);
      this.rifas_recaudado += Number(deposito.talones_recaudado_total);
    }
    this.recaudado_total = Number(this.rifas_recaudado) + Number(this.pago_personal_total);
    this.registro_total = Number(this.rifas_registrado) + Number(this.pago_personal_total);

    console.log("Valor recaudado de Rifas: " + this.rifas_recaudado);
  }

  add(descripcion: string, monto: number) {
    var idPas = this.pasajero.id;
    var descripcion = descripcion;
    var monto = monto;

    this._costoExtraService.add(Number(idPas), descripcion, monto).subscribe((response: any) => {
      console.log(response);
      let status = response.status;

      if (status != 'success') {
        console.log("Errorrrrrr");
        status = 'error';
      }

      if (status == 'success') {
        console.log("acá");
        console.log("response");
        console.log(response);

        const nuevoCosto = {
          Descripcion: response.data.Descripcion,
          Monto: response.data.Monto,
        };

        // Recalculate the sum of all the remaining costos extras
        let costosExtra = 0;
        for (let index = 0; index < this.costos.length; index++) {
          if (this.costos[index].Monto > 0) {
            const monto = Number(this.costos[index].Monto);
            costosExtra = costosExtra + monto;
          }
        }

        console.log("costosExtra");
        console.log(costosExtra);
        this.costosExtraPositivosSumados = costosExtra;

        this.costos.push(nuevoCosto);
        this.getCostosExtrasByPasajeroId(idPas);

        // call costoTotal() to recalculate the total cost
        this.costoTotal();

        console.log("this.costoTotal()");
        console.log(this.costoTotal());



        /* this.costos[this.costos.length - 1] = nuevoCosto; */

        console.log("this.costosExtraPositivosSumados: ");
        console.log(this.costosExtraPositivosSumados);
        console.log("total costo: ");
        console.log(this.totalCosto);
        console.log("acá 2");
      }
    });
  }

}



