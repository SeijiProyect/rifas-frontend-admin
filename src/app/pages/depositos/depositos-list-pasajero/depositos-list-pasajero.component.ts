import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { PasajeroService } from 'src/app/services/pasajero.service';
import { DepositosChipsComponent } from '../depositos-chips/depositos-chips.component';
//import { PasajeroService } from 'src/app/services/pasajero.service';

const ELEMENT_DATA: any[] = [];

@Component({
  selector: 'app-depositos-list-pasajero',
  templateUrl: './depositos-list-pasajero.component.html',
  styleUrls: ['./depositos-list-pasajero.component.scss']
})
export class DepositosListPasajeroComponent implements OnInit {
  public idPasajero = '';
  today: Date = new Date();
  public depositos: any = [];

  public loading: boolean = false;
  public totalDepositos: number = 0;
  public pageIndex = 0;
  public pageSize = 10;

  public estado = '';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) tabla1!: MatTable<any>;
  @ViewChild(DepositosChipsComponent) hijo!: DepositosChipsComponent;

  columnas: string[] = ['Id', 'Fecha', 'Monto', 'Tipo', 'Rifas', 'P.Personal', 'Saldo', 'Actions'];
  dataSource = ELEMENT_DATA;

  constructor(private _pasajeroService: PasajeroService) { }

  ngOnInit(): void {
    /* let id_pas = localStorage.getItem("idPasajero");
     if (id_pas != null) {
       this.idPasajero = id_pas;
       this.getDepositosByPasajeroId(Number(this.idPasajero));
     }*/
  }

  pageEvent(page: any) {
    this.dataSource = [];
    //console.log("VALOR INDEX PAGE: " + page.pageIndex);
    this.pageIndex = page.pageIndex;
    let depositosAux: any = [];
    var i = this.pageSize * this.pageIndex;
    while (i < this.pageSize * this.pageIndex + this.pageSize) {
      if (this.depositos[i]) {
        depositosAux.push(this.depositos[i]);
      }
      i += 1;
    };
    this.dataSource = depositosAux;
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
          //console.log("TABLA de depositos psajero:");
          //console.log(response.data);
          let depositos = response.data;
          let itemAux;
          for (let item of depositos) {
            itemAux = {
              id: Number(item.id),
              idPasajero: idPasajero,
              tipo: item.tipo,
              fecha: item.fecha,
              monto: item.monto,
              pagoPersonal_total: item.pagoPersonal_total,
              talones_recaudado_total: item.talones_recaudado_total,
              talones_total: item.talones_total,
              saldo: item.monto - item.talones_total - item.pagoPersonal_total,
              seleccionado: false,
            }
            this.depositos.push(itemAux);
          }

          console.log("LIstado depositos: ");
          console.log(this.depositos);
          this.totalDepositos = this.depositos.length;
          let depositosAux: any = [];
          var i = 0;
          while (i < this.pageSize) {
            //console.log("Deposito:");
            //console.log(this.depositos[i]);
            if (this.depositos[i]) {
              depositosAux.push(this.depositos[i]);
            }
            i += 1;
          };
          this.dataSource = depositosAux;
          this.loading = false;
        }
      });
  }

  Unir(obj: any) {
    console.log("Deposito seleccionada: " + obj);
    console.log(obj);
    //this.estado = 'step1';
    //const index = this.depositos.findIndex(x => x.LastName === "Skeet");
    let index = this.depositos.indexOf(obj);
    this.depositos[index].seleccionado = true;
    console.log("Valor index: ");
    console.log(index);
    //this.pasajero = obj;
    this.hijo.guardar(obj);
  }

  receiveMessage($event: any) {
    let salida = $event.accion;
    console.log("Respuesta de chip: ");
    console.log(salida);

    if (salida == 'juntar') {
      //this.dataSource = [];
      this.depositos = [];
      //Cargo listado de depositos
      //let idPasajero = 874;
      let idPasajero = localStorage.getItem("idPasajero");
      /* console.log("Pasajero id Juntar depo");
       console.log(idPasajero);*/
      this.getDepositosByPasajeroId(Number(idPasajero));
    }

    if (salida == 'remover') {
      let id = $event.id;
      let auxDeposito;
      for (let item of this.depositos) {
        if (item.id == id) {
          auxDeposito = item;
        }
      }
      let index = this.depositos.indexOf(auxDeposito);
      this.depositos[index].seleccionado = false;

    }

  }



}