import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DepositosService } from 'src/app/services/depositos.service';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dialog-editar-monto',
  templateUrl: './dialog-editar-monto.component.html',
  styles: [
  ]
})
export class DialogEditarMontoComponent implements OnInit {

  /* public selectedRow: any; */

  public depositos: any;

  public totalDepositos: number = 0;
  public pageIndex = 0;
  public selectedTipo = 'todos';
  public selectedPasajero = 'todos';
  public desdeValue: any;
  public hastaValue: any;
  public termino: string = '';

  public loading: boolean = false;

  constructor( public dialogRef: MatDialogRef<DialogEditarMontoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {name: string},
    private _depositosService: DepositosService) { }

  ngOnInit(): void {

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

          console.log(this.depositos);

          this.totalDepositos = response.data.totalDepositos;
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

      });
  }


  /* onNoClick(): void {
    this.dialogRef.close();
  } */

}
