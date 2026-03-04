import { Component, OnInit } from '@angular/core';
import { Rifa } from 'src/app/models/rifa.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Organizador } from 'src/app/models/organizador.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RifaService } from 'src/app/services/rifa.service';
import { HttpClient } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-rifas-crear',
  templateUrl: './rifas-crear.component.html',
  styleUrls: ['./rifas-crear.component.scss']
})
export class RifasCrearComponent implements OnInit {

  public idRifa = '';

  organizador_1: Organizador = {
    id: 1,
    nombre: 'De Toque y Toque'
  };
  public selectedOrganizador = this.organizador_1;

  form: FormGroup = new FormGroup({});
  today: Date = new Date();
  model: Rifa = {
    id: 0,
    nombre: '',
    descripcion: '',
    fecha_inicio: this.today,
    fecha_fin: this.today,
    organizador: this.organizador_1,
  };
  editable = false;

  constructor(private _rifaService: RifaService, private http: HttpClient, private snackBar: MatSnackBar) {
    this.buildForm();
  }

  ngOnInit(): void {
    let id = localStorage.getItem("idRifa");
    console.log('Valor variable local rifa: '+id);
    if (id === '') {
     
    }else{
      this.editable = true;
      console.log('EDITAR RIFA');
      this.getRifa(Number(id));
    }

  }

  private buildForm() {
    this.form = new FormGroup({
      //id: new FormControl({ value: null, disabled: false }, [Validators.required]),
      nombre: new FormControl({ value: null, disabled: false }, [Validators.required]),
      descripcion: new FormControl({ value: null, disabled: false }, [Validators.required]),
      organizador: new FormControl({ value: this.model.organizador?.id.toString(), disabled: false }, [Validators.required]),
      fecha_inicio: new FormControl({ value: null, disabled: false }, [Validators.required]),
      fecha_fin: new FormControl({ value: null, disabled: false }, [Validators.required]),
    });

    this.form.valueChanges
      .subscribe(value => {
        // console.log(value);
      });
  }

  refreshPage() {
    localStorage.setItem("idRifa", '');
    window.location.reload();
    //this._document.defaultView.location.reload();
  }

  deshacer() {
    this.editable = false;
  }

  getRifa(idRifa: number) {
    this._rifaService.getRifaById(idRifa).subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      } else {
        console.log("RIFA encontrada");
        console.log(response.data);
        this.model = response.data;

        var fecha_inicio = response.data.fecha_inicio.date == 'null' ? new Date() : new Date(response.data.fecha_inicio.date);
        this.model.fecha_inicio = fecha_inicio;

        var fecha_fin = response.data.fecha_fin.date == 'null' ? new Date() : new Date(response.data.fecha_fin.date);
        this.model.fecha_fin = fecha_fin;

        var organizador = '';
        organizador = response.data.organizador_id.toString();
        if (organizador != '') {
          this.selectedOrganizador = response.data.organizador_id.toString();
        }
      }
    });

  }

  organizadorChange(event: any) {
    this.selectedOrganizador = event.value;
    //console.log("SEXO SELECCIONADO: " +this.selectedSexo);
  }

  save(event: any) {
    console.log("Guardar Rifa");
    this.model.organizador = this.selectedOrganizador;
    console.log(this.model);
    this._rifaService.crearRifa(this.model)
      .subscribe((response: any) => {
        if (response.status == 'success') {
          this.showSuccessMessage();
          this.refreshPage();
          //console.log("Respuesta GUARDAR RIFA");
          //console.log(response.data);
        } else {
          console.log(response.message);
          this.showErrorMessage();
        }
      }, error => {
        console.error('Error al guardar la Rifa:', error);
        this.showErrorMessage();
      });

  }

  editar(event: any) {
    //console.log("Guardar Persona");
    //this.model.sexo = this.selectedSexo;
    console.log(this.model);
    this._rifaService.editarRifa(this.model)
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
         console.error('Error guardando rifa:', error);
         this.showErrorMessage();
       });

  }

  showErrorMessage() {
    this.snackBar.open('La rifa no se pudo guardar', 'Cerrar', {
      duration: 2000,
    });
  }

  showSuccessMessage() {
    this.snackBar.open('Rifa guardada con éxito', 'Cerrar', {
      duration: 2000,
    });
  }

}
