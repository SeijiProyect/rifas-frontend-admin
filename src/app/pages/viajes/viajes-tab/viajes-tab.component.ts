import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, inject } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { UserService } from "../../../services/user.service";
import { GlobalService } from '../../../common/global.service';
import { ViajeService } from '../../../services/viaje.service';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-viajes-tab',
  templateUrl: './viajes-tab.component.html',
  styleUrls: ['./viajes-tab.component.scss'],
})
export class ViajesTabComponent implements OnInit {

  idViaje: number = 0;
  public pasajero: any;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: Fruit[] = [
    { name: 'ejemplo@mail.com' },
  ];

  model: any = {
    id: 0,
    token: ''
  };

  constructor(private snackBar: MatSnackBar,
    private router: Router, private userService: UserService,
    public globalService: GlobalService, private _viajeService: ViajeService,) {

  }

  ngOnInit(): void {
  }

  recibirIdViaje(idViaje: number) {
    this.idViaje = idViaje;
    console.log("Id Viaje del componente hijo: " + this.idViaje);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  enviar(event: any) {

    alert("En modo prueba!!");
    //console.log("Guardar Persona");
    /*this.model.sexo = this.selectedSexo;
    console.log(this.model);
    this._personasService.editarPersona(this.model)
       .subscribe((response: any) => {
         if (response.status == 'success') {
           this.showSuccessMessage();
           this.refreshPage();
           //console.log("Respuesta EDITAR PERSONA");
           //console.log(response.data);
         } else {
           this.showErrorMessage();
         }
       }, error => {
         console.error('Error guardando persona:', error);
         this.showErrorMessage();
       });*/

  }

  async loginFree() {
    await this.userService.loginFree().subscribe((resp: any) => {
      if (resp.status == 'success') {
        console.log("TOKEN FREEE login (3 meses):")
        console.log(resp.token);
        //localStorage.setItem(this.globalService.getTokenName(), resp.token);
        /*let viaje: any;
        viaje.id = this.idViaje;
        viaje.token = resp.token;*/
        this.model.id = this.idViaje;
        this.model.token = resp.token;

        // Guardo el Token en el viaje
        this._viajeService.guardarTokenViaje(this.model)
          .subscribe((response: any) => {
            if (response.status == 'success') {
              console.log("Respuesta GUARDAR TOKEN");
              console.log(response.data);
            }
          }, error => {
            console.error('Error:', error.error.message);
          });

      } else {
        console.log(resp.message);
      }
    });
  }

  generarTokenFree() {
    this.userService.tokenFree().subscribe((resp: any) => {
      if (resp.status == 'success') {
        console.log("TOKEN FREE (12 meses):")
        console.log(resp.token);
        //Generar un Token de acceso publico
        //localStorage.getItem(this.globalService.getTokenName()) || '';
        localStorage.setItem(this.globalService.getTokenPublico(), resp.token);
      } else {
        console.log(resp.message);
      }
    });
  }

  verFormulario() {
    if (this.idViaje != 0) {
      //Tengo que abrir una session para USUARIOS
      this.loginFree();
      //this.router.navigate(['/formularioInscripcion', this.idViaje],{ skipLocationChange: true })
      //window.location.href = 'https://formularioinscripcion.detoqueytoque.com/viaje/'+this.idViaje;
      window.open('https://formularioinscripcion.detoqueytoque.com/viaje/'+this.idViaje, '_blank');
    } else {

      const msg = "Debes seleccionar un viaje";
      this.showErrorMessage(msg);
    }

  }

  showErrorMessage(msg: string) {
    this.snackBar.open('No se pudo enviar el formulario: ' + msg, 'Cerrar', {
      duration: 2000,
    });
  }

  showSuccessMessage() {
    this.snackBar.open('Rifa guardada con éxito', 'Cerrar', {
      duration: 2000,
    });
  }


}
