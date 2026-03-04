import { Component, OnInit, Input } from '@angular/core';
import { Pasajero } from 'src/app/models/pasajero.model';
import { Itinerario } from 'src/app/models/itinerario.model';
import { Persona } from 'src/app/models/persona.model';
import { PasajeroService } from '../../../services/pasajero.service';
import { PersonaService } from '../../../services/persona.service';
import { ConfirmUploadDialogComponent } from 'src/app/shared/confirm-upload-dialog/confirm-upload-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pasajero-form',
  templateUrl: './pasajero-form.component.html',
  styleUrls: ['./pasajero-form.component.scss']
})
export class PasajeroFormComponent implements OnInit {
  @Input() selectedPasajero!: string;
  //@Input('master') masterName = '';
  formDatosPasajero: FormGroup = new FormGroup({});
  today: Date = new Date();
  public idPersona = '';

  itinerario: Itinerario = {
    id: 0, nombre: '', precio: 0, comentarios: ''
  };

  persona: Persona = {
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

  /* pasajero: Pasajero = {
     id: 0, itinerario: this.itinerario, univesidad: '', acompaniante: '', estado: '', comentarios: ''
   };*/

  model: Pasajero = {
    id: 0,
    nombre: '',
    apellido: '',
    itinerario: this.itinerario,
    persona: this.persona,
    univesidad: '',
    acompaniante: '',
    estado: '',
    comentarios: '',
  };

  photoUrl: string | null = null;
  foto: string = 'assets/imgs/foto_predeterminada_pasaporte.png';
  archivo = {
    nombre: null,
    nombreArchivo: null,
    base64textString: ''
  }

  imageSrc: any = '';
  status: boolean = false
  //

  constructor(private _pasajeroService: PasajeroService,
    private _personaService: PersonaService, private dialog: MatDialog) {
    this.buildForm();
  }

  ngOnInit() {
    //let id = localStorage.getItem("idPersona");

    /*if (id != null) {
      this.idPersona = id;
      this.getPasajeroByPersonaId(Number(this.idPersona));
    }*/

    //localStorage.setItem("idPasajero", viaje.pasajero_id.toString());
    let id_pas = localStorage.getItem("idPasajero");
    if (id_pas != null) {
      this.cargarPasajero(Number(id_pas));
    }

  }

  private buildForm() {
    this.formDatosPasajero = new FormGroup({
      pasajero_id: new FormControl({ value: null, disabled: true }, [Validators.required]),
      acompaniante: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.maxLength(8)]),
      itinerario_id: new FormControl({ value: null, disabled: true }, [Validators.required]),
      itinerario_nombre: new FormControl({ value: null, disabled: true }, [Validators.required]),
      itinerario_precio: new FormControl({ value: null, disabled: true }, [Validators.email]),
      comentario: new FormControl({ value: null, disabled: true }, [Validators.maxLength(200)]),
    });

    this.formDatosPasajero.valueChanges
      .subscribe(value => {
        // console.log(value);
      });
  }

 /* async getPasajeroByPersonaId(idPersona: number) {
    this._pasajeroService.getPasajeroActivoByPersona(idPersona).subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        this.model = response.data;
        console.log("Datos pasajero form:");
        console.log(response.data);
        this.itinerario = response.data['itinerario'];
        this.itinerario.id = response.data['itinerario']['idItinerario'];

        let acomp = response.data['acompaniante'];
        let nombreAcompaña = 'Titular';
        if (acomp != null) {
          nombreAcompaña = acomp;
        }
        //this.pasajero.acompaniante = nombreAcompaña;
        // localStorage.setItem("idPasajero", this.pasajero.id.toString());
      }
    });

  }*/

  cargarPasajero(pasajero_id: number) {
    // Buscar y cargar datos de pasajero
    console.log("Cargar pasajero: " + pasajero_id);
    this._pasajeroService.getPasajeroById(pasajero_id).subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        this.model = response.data;
        console.log("Datos 2 pasajero form:");
        console.log(response.data);
        this.itinerario = response.data['itinerario'];
        this.itinerario.id = response.data['itinerario']['idItinerario'];

        let acomp = response.data['acompaniante'];
        let nombreAcompaña = 'Titular';
        if (acomp != null) {
          nombreAcompaña = acomp;
        }
      }
    });
  }

}
