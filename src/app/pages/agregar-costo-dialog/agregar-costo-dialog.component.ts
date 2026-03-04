import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-costo-dialog',
  templateUrl: './agregar-costo-dialog.component.html',
  styleUrls: ['./agregar-costo-dialog.component.scss']
})
export class AgregarCostoDialogComponent {

  constructor(public dialogRef: MatDialogRef<AgregarCostoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {

    if (!this.isDescripcionValid()) {
      alert('La descripción debe tener al menos una letra.');
      return;
    }

    if (!this.isMontoValid()) {
      alert('El monto debe tener al menos un número distinto de cero.');
      return;
    }

    this.dialogRef.close(this.data);
  }

  /* isDescripcionValid(): boolean {
    return this.data.descripcion && /^[A-Za-z0-9]+[A-Za-z\s]*$/.test(this.data.descripcion);
  } */

  isDescripcionValid(): boolean {
    return this.data.descripcion && /^[A-Za-z0-9áéíóúÁÉÍÓÚñÑ\s\-.,:;!¡¿?@#$%^&*()]+$/u.test(this.data.descripcion);
  }

  isMontoValid(): boolean {
    return this.data.monto && this.data.monto != 0 && !isNaN(this.data.monto);
  }


}
