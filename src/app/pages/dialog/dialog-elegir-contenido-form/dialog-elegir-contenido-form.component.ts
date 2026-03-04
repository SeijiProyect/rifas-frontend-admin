import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-elegir-contenido-form',
  templateUrl: './dialog-elegir-contenido-form.component.html',
  styleUrls: ['./dialog-elegir-contenido-form.component.scss']
})
export class DialogElegirContenidoFormComponent {

  public selectedViaje = 0;
  public selectItinerario: any = null;
  visible_grupo: boolean = false;
  visible_itinerario: boolean = false;
  public visible: boolean = false;
  ocultar_grupos: boolean = true;
  ocultar_itinerarios: boolean = true;

  itinerario: any = { id: '', Nombre: '' };
  sena: boolean = true;

  result: any = {
    evento: '',
    itinerario: null,
    sena: true,
  };

  model: any = {
    sena: '',
    itinerario: null
  };

  /*
    myGroup = new FormGroup({
      itinerario: new FormControl({ value: null, disabled: false }, [Validators.required])
    });*/

  /*myGroup = this._formBuilder.group({
    itinerario: ['', Validators.requiredTrue],
  });*/

  checkedIti = true;
  checkedSena = true;

  toppings = this._formBuilder.group({
    itinerarios: true,
    sena: true
  });

  /*model: any = {
    id: 0,
    sena: "",
    viaje: "",
    itinerario: "",
  };*/

  constructor(public dialogRef: MatDialogRef<DialogElegirContenidoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder) {

  }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.result.evento = 'cancel';
    this.result.itinerario = null;
    this.result.sena = true;

    this.dialogRef.close(this.result);
  }


  onConfirmClick(): void {
    this.result.evento = 'confirm';
    this.result.itinerario = this.selectItinerario;
    this.result.sena = this.checkedSena;

    this.dialogRef.close(this.result);
    // Actualizar el ITINERARIO de Pasajero
    /* this._pasajeroService.updateItinerarioPasajeroById(this.data.pasajero_id, this.data.Itinerario_2_id)
       .subscribe((response: any) => {
         if (response.status == 'success') {
           console.log("Respuesta ACTUALIZAR ITINERARIO");
           console.log(response.data);
           this.dialogRef.close('confirm');
         }
       }, error => {
         console.error('Error al actualizar:', error.error.code);
       });*/
  }


  recibirOcultarItinerario(ocultar: boolean) {
    this.visible_itinerario = ocultar;
    //console.log("TAMANIO DE COMPONENTE GRUPO: " + this.visible_grupo);
    if (this.visible_itinerario) {
      this.ocultar_itinerarios = false;
    }
  }

  itinerarioSeleccionado(itinerario: any) {
    console.log("SELECTED ITINERARIO: ");
    console.log(itinerario);
    this.selectItinerario = itinerario;
    /*this.selectItinerario = Number(itinerario);

    this.formDatosViaje.controls['itinerario'].setErrors({ 'incorrect': true });
    this.formDatosViaje.controls['itinerario'].setErrors(null);
    this.mensaje_error = false;*/
    // console.log("Status Itinerario: " + this.formDatos.controls['itinerario'].status);
    localStorage.setItem("selectedItinerario", itinerario.toString());
  }

}
