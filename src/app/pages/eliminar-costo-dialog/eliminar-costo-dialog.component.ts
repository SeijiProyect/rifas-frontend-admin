
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-costo-dialog',
  templateUrl: './eliminar-costo-dialog.component.html',
  styleUrls: ['./eliminar-costo-dialog.component.scss']
})
export class EliminarCostoDialogComponent {

  constructor(public dialogRef: MatDialogRef<EliminarCostoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    this.dialogRef.close('confirm');
  }

}
