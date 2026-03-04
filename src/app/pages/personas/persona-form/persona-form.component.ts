import { Component, Inject, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona.model';
import { PersonaService } from '../../../services/persona.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmUploadDialogComponent } from 'src/app/shared/confirm-upload-dialog/confirm-upload-dialog.component';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { environment } from 'src/environments/environment';

// PRUEBA ACTION EN PROD

//PRUEBA ACTION EN DEV
// PRUEBA ACTION github habilitado
@Component({
  selector: 'app-persona-form',
  templateUrl: './persona-form.component.html',
  styleUrls: ['./persona-form.component.scss'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: 'fr' },

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})

export class PersonaFormComponent implements OnInit {
  //let dateOfBirth: Moment = this.studentForm.get('dateOfBirth').value;
  //dateOfBirth: moment("12/25/1995", "MM/DD/YYYY");

  formDatosPersonales: FormGroup = new FormGroup({});
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

  today: Date = new Date();
  public idPersona = '';

  modelInit: Persona = {
    id: 0,
    nombres: '',
    apellidos: '',
    cedula: '',
    celular: '',
    direccion: '',
    fecha_nac: this.today,
    sexo: '',
    email: ""
  };

  model: Persona = {
    id: 0,
    nombres: '',
    apellidos: '',
    cedula: '',
    celular: '',
    direccion: '',
    fecha_nac: this.today,
    sexo: '',
    email: ""
  };
  public selectedSexo = 'todos';
  subscription: any;
  //selectedfile:File = null;
  formData = new FormData();
  photoUrl: string | null = null;
  foto: string = 'assets/imgs/sin-foto.webp';
  editable = false;
  archivo = {
    nombre: null,
    nombreArchivo: null,
    base64textString: ''
  }

  imageSrc: any = '';
  status: boolean = false

  constructor(private _personasService: PersonaService, private http: HttpClient,
    private snackBar: MatSnackBar, private dialog: MatDialog, private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string) {

    this.buildForm();

  }

  ngOnInit() {
    let id = localStorage.getItem("idPersona");
    if (id != null) {
      this.idPersona = id;
      this.getPersona(Number(this.idPersona));
    }
  }

  private buildForm() {
    this.formDatosPersonales = new FormGroup({
      id: new FormControl({ value: null, disabled: true }, [Validators.required]),
      cedula: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.maxLength(8)]),
      nombre: new FormControl({ value: null, disabled: true }, [Validators.required]),
      apellido: new FormControl({ value: null, disabled: true }, [Validators.required]),
      email: new FormControl({ value: null, disabled: true }, [Validators.email]),
      direccion: new FormControl({ value: null, disabled: true }, [Validators.maxLength(200)]),
      sexo: new FormControl({ value: null, disabled: true }, [Validators.required]),
      celular: new FormControl({ value: null, disabled: true }, [Validators.required]),
      fechaNac: new FormControl({ value: null, disabled: true }, [Validators.required]),
    });

    this.formDatosPersonales.valueChanges
      .subscribe(value => {
        // console.log(value);
      });
  }

  refreshPage() {
    window.location.reload();
    //this._document.defaultView.location.reload();
  }

  borrarFoto() {
    this.refreshPage();
    //this.photoUrl = null;
    //this.foto = 'assets/imgs/sin-foto.webp';
  }

  guardarFoto() {
    //console.log("ARCHIVO GUARDAR");
    //console.log(this.imageSrc);
    this._personasService.uploadFotoPersona(this.imageSrc, this.idPersona).subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      } else {
        //console.log("Respuesta Guardar Imagen: ");
        //console.log(response.data);
        this.refreshPage();
      }
    });

  }

  sexoChange(event: any) {
    this.selectedSexo = event.value;
    //console.log("SEXO SELECCIONADO: " +this.selectedSexo);
  }

  getPersona(idPersona: number) {
    this._personasService.getPersonaById(idPersona).subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      } else {
        this.model = response.data;
        var sexo = '';
        sexo = response.data.sexo.toString();
        if (sexo != '') {
          this.selectedSexo = response.data.sexo.toString();
        }
        //console.log("SEXO: " + response.data.sexo);
        //console.log("FOTOS: ");
        if (response.data.foto.length > 0) {
          //console.log(response.data.foto[0]['url']);
          var archivo_nombre = response.data.foto[0]['nombre'];
          //console.log("Nombre Archivo: " + archivo_nombre);
          if (archivo_nombre == 'image-rota.png') {
            this.foto = environment.url + "/assets/imgs/" + archivo_nombre;
          } else {
            this.foto = environment.url + "/assets/imgs/persona/" + this.idPersona + "/foto/" + archivo_nombre;
          }

          //this.foto = 'http://127.0.0.1' + "/gestion-backend/assets/imgs/persona/40/foto/" + archivo_nombre;
          //this.foto = response.data.foto[0]['url'].replace(':8000',''); // ELIMINO EL PUERTO
        }

        var fechanaci = response.data.fecha_nac.date == 'null' ? new Date() : new Date(response.data.fecha_nac.date);
        this.model.fecha_nac = fechanaci;

        //console.log("Fecha de Nacimiento (Formateada): " + fechanaci.toISOString());
        //this.date = new FormControl(fechanaci);
        //this.serializedDate = new FormControl(fechanaci.toISOString());
      }
    });

  }

  uploadPhoto(event: any) {

    let fotoLast = this.foto;
    // EJEMPLO phpforever.com
    this.status = false
    const file = event.target.files[0];
    this.status = event.target.files.length > 0 ? true : false
    if (this.status == true) {
      //console.log("SE CARGO LA IMAGEN...");
      // Create a FileReader object
      const reader = new FileReader();
      // Set the onload event to handle the image preview
      reader.onload = (e: any) => {
        this.imageSrc = reader.result;
        this.photoUrl = e.target.result;
        this.foto = e.target.result;
        this.archivo.base64textString = e.target.result;
        //console.log('IMAGEN CARGADA: ');
        //console.log(e);
      };
      // Read the file as a DataURL
      reader.readAsDataURL(file);
    }
    //Open the dialog by calling the open() method
    const dialogRef = this.dialog.open(ConfirmUploadDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // if the user confirms, make the http post request to save the image
        /* this.http.post('/server/upload', this.formData)
           .subscribe((response: any) => {
             // do something with the response
           }, error => {
             console.error('Error uploading photo:', error);
           });*/

      } else {
        this.photoUrl = null;
        this.foto = fotoLast;
      }
    });

  }

  save(event: any) {
    //console.log("Guardar Persona");
    this.model.sexo = this.selectedSexo;
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
      });

  }

  editar() {
    this.editable = true;
    this.formDatosPersonales = new FormGroup({
      id: new FormControl({ value: this.model.id, disabled: true }, [Validators.required]),
      cedula: new FormControl({ value: this.model.cedula, disabled: false }, [Validators.required, Validators.maxLength(8)]),
      nombre: new FormControl({ value: this.model.nombres, disabled: false }, [Validators.required]),
      apellido: new FormControl({ value: this.model.apellidos, disabled: false }, [Validators.required]),
      email: new FormControl({ value: this.model.email, disabled: true }, [Validators.email]),
      direccion: new FormControl({ value: this.model.direccion, disabled: false }, [Validators.maxLength(200)]),
      sexo: new FormControl({ value: this.selectedSexo, disabled: false }, [Validators.required]),
      celular: new FormControl({ value: this.model.celular, disabled: false }, [Validators.required]),
      fechaNac: new FormControl({ value: this.model.fecha_nac, disabled: false }, [Validators.required]),
    });
  }

  deshacer() {
    this.editable = false;
    //this.formDatosPersonales.reset();
    this.getPersona(Number(this.idPersona));
    this.formDatosPersonales = new FormGroup({
      id: new FormControl({ value: this.model.id, disabled: true },),
      cedula: new FormControl({ value: this.model.cedula, disabled: true },),
      nombre: new FormControl({ value: this.model.nombres, disabled: true },),
      apellido: new FormControl({ value: this.model.apellidos, disabled: true },),
      email: new FormControl({ value: this.model.email, disabled: true }, [Validators.email]),
      direccion: new FormControl({ value: this.model.direccion, disabled: true },),
      sexo: new FormControl({ value: this.model.sexo, disabled: true },),
      celular: new FormControl({ value: this.model.celular, disabled: true },),
      fechaNac: new FormControl({ value: this.model.fecha_nac, disabled: true },),
    });

  }

  showErrorMessage() {
    this.snackBar.open('La persona no se pudo guardar', 'Cerrar', {
      duration: 2000,
    });
  }

  showSuccessMessage() {
    this.snackBar.open('Persona guardada con éxito', 'Cerrar', {
      duration: 2000,
    });
  }

}


