import { Component, Inject, OnInit } from '@angular/core';
//import { DialogData } from '../../dinero/dinero.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-pasajeros-dialog',
  templateUrl: './pasajeros-dialog.component.html',
  styleUrls: ['./pasajeros-dialog.component.scss']
})
export class PasajerosDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PasajerosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
