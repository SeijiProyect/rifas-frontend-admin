import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PasajeroService } from 'src/app/services/pasajero.service';

@Component({
  selector: 'app-dialog-cambio-itinerario',
  templateUrl: './dialog-cambio-itinerario.component.html',
  styleUrls: ['./dialog-cambio-itinerario.component.scss']
})
export class DialogCambioItinerarioComponent {

  constructor(private _pasajeroService: PasajeroService,
    public dialogRef: MatDialogRef<DialogCambioItinerarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close('cancel');
  }


  onConfirmClick(): void {
    // Actualizar el ITINERARIO de Pasajero
    this._pasajeroService.updateItinerarioPasajeroById(this.data.pasajero_id, this.data.Itinerario_2_id)
      .subscribe((response: any) => {
        if (response.status == 'success') {
          console.log("Respuesta ACTUALIZAR ITINERARIO");
          console.log(response.data);
          this.dialogRef.close('confirm');
        }
      }, error => {
        console.error('Error al actualizar:', error.error.code);
      });

  }

}
