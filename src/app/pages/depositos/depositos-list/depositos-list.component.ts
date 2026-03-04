import { Component, OnInit, ViewChild } from '@angular/core';

import { DepositosService } from '../../../services/depositos.service';
import { Router } from '@angular/router';
import { GlobalService } from '../../../common/global.service';
import { PasajeroService } from '../../../services/pasajero.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'depositos-list',
  templateUrl: './depositos-list.component.html',
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
export class DepositosListComponent implements OnInit {
  public depositos: any;
  public pasajeros: any;
  public pasajero: any;
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
  expandedElement: any;
  columnsToDisplay = ['id', 'Monto', 'Pasajero', 'Tipo', 'Fecha', 'Cedula', 'Celular', 'Email'];
  columnsToDisplayVal = [
    { key: 'id', name: 'Id' },
    { key: 'Monto', name: 'Monto' },
    { key: 'Pasajero', name: 'Pasajero' },
    { key: 'Tipo', name: 'Tipo' },
    { key: 'Fecha', name: 'Fecha' },
    { key: 'Cedula', name: 'Cédula' },
    { key: 'Celular', name: 'Celular' },
    { key: 'Email', name: 'Email' },
  ];

  constructor(
    private _depositosService: DepositosService,
    private _pasajeroService: PasajeroService,
    public globalService: GlobalService,
    public router: Router
  ) { }

  async ngOnInit() {
    await this.getDepositos();
    await this.getPasajeros();
  }

  announceSortChange(event: any) {
  }

  getDepositos() {
    this.loading = true;
    let hastaAux = this.hastaValue;

    if (this.hastaValue) {
      let re = '00:00:00';
      hastaAux = this.hastaValue.format().replace(re, '23:59:00');
    }

    this._depositosService
      .getDepositos(
        this.pageIndex,
        this.selectedTipo,
        this.desdeValue,
        hastaAux,
        this.selectedPasajero,
        this.termino
      )
      .subscribe((response: any) => {
        let status = response.status;

        if (status != 'success') {
          status = 'error';
        }

        if (status == 'success') {
          this.depositos = response.data.depositos;

          // console.log(response.data);

          // console.log(this.depositos);

          this.totalDepositos = response.data.totalDepositos;

          // console.log(this.totalDepositos);

          this.depositos.forEach((depo: any) => {
            if (depo.Fecha != null) {
              let dateAux = new Date(depo.Fecha?.date);
              depo.Fecha =
                dateAux.getDate() +
                '/' +
                (dateAux.getMonth() + 1) +
                '/' +
                dateAux.getFullYear();
            }
          });
        }
        this.loading = false;
      });
  }

  getPasajeros() {
    this.loading = true;
    this._pasajeroService.getPasajerosList().subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        this.pasajeros = response.data;
        console.log("Listado de pasajeros: " + this.pasajeros[0].nombres);
        
      }
      this.loading = false;
      this.pasajerosLoading = false;
    });
  }

  pageEvent(page: any) {
    this.pageIndex = page.pageIndex;
    this.getDepositos();
    console.log('Se está ejecutando el pageEvent de depósitos');
  }

  statusChange(event: any) {
    this.selectedTipo = event.value;
  }

  pasajeroChange(event: any) {
    this.selectedPasajero = event;
  }

  filter() {
    this.pageIndex = 0;
    this.getDepositos();
  }
}
