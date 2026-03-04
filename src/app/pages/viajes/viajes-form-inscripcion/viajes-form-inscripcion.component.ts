import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';
import { ItinerariosListComponent } from '../../itinerarios/itinerarios-list/itinerarios-list.component';
import { GlobalService } from 'src/app/common/global.service';
import { ViajeService } from '../../../services/viaje.service';

import { IpClientService } from 'src/app/services/ip-client.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogCambioItinerarioComponent } from '../../dialog/dialog-cambio-itinerario/dialog-cambio-itinerario.component';


@Component({
  selector: 'app-viajes-form-inscripcion',
  templateUrl: './viajes-form-inscripcion.component.html',
  styleUrls: ['./viajes-form-inscripcion.component.scss']
})
export class ViajesFormInscripcionComponent implements OnInit {

  @ViewChild(ItinerariosListComponent) hijo!: ItinerariosListComponent;

  pasajero_id = 0;
  itinerario_1_id = 0;
  itinerario_1_nombre = "";
  itinerario_2_id = 0;
  itinerario_2_nombre = ""

  ipAddress: string;
  msj: string = '';

  viaje_id: number = 0;
  viaje_nombre = "";
  visible_grupo: boolean = false;
  visible_itinerario: boolean = false;
  public visible: boolean = false;
  ocultar_grupos: boolean = true;
  ocultar_itinerarios: boolean = true;
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  today: Date = new Date();

  error: string = 'Error';
  mensaje_error: boolean = false;
  button_cambio_iti: boolean = false;
  formDatos: FormGroup = new FormGroup({});
  public selectedSexo = 'todos';
  public selectedGrupoPadre = 0;
  public selectedItinerarioPadre = 0;
  public selectedUniversidad = 3; // Generica

  public idPersona = '';

  modelInit: any = {
    id: 0,
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    cedula: '',
    celular: '',
    direccion: '',
    fechaNac: this.today,
    sexo: '',
    email: "",
    viaje: "",
    grupo: 0,
    itinerario: 0,
    universidad: 0
  };

  model: any = {
    id: 0,
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    cedula: '',
    celular: '',
    direccion: '',
    fechaNac: this.today,
    sexo: '',
    email: "",
    viaje: "",
    grupo: "",
    itinerario: "",
    universidad: ""
  };

  constructor(private _viajeService: ViajeService, private snackBar: MatSnackBar,
    private responsive: BreakpointObserver, private activatedRoute: ActivatedRoute,
    private globalService: GlobalService, private ip: IpClientService, private dialog: MatDialog) {
    //console.log(activatedRoute);
    activatedRoute.params.subscribe(prm => {
      //console.log(`El id es: ${prm['id']}`);
      this.viaje_id = prm['id'];
    })

    if (this.viaje_id == 0 || this.viaje_id == undefined) {
      this.visible = false;
      console.log("Sin parametros");
    } else {
      this.visible = true;
      console.log("Parametro (Id Viaje) :" + this.viaje_id);
      // BUSCAR VIAJE ACTIVOS

      // Obtener TOKEN de viaje y cargar session
      this.getTokenViaje(this.viaje_id);

      //localStorage.setItem(this.globalService.getTokenName(), resp.token);
      this.buildForm();
    }
  }

  ngOnInit(): void {

    this.getIP();
    /* SERVICIO BREAKPOINTOBSERVER (detecta el tamaño del dispositivo actual)*/
    /* console.log('Web ' + Breakpoints.Web);
     console.log('WebLandscape ' + Breakpoints.WebLandscape);
     console.log('WebPortrait ' + Breakpoints.WebPortrait);
 
     console.log('Tablet ' + Breakpoints.Tablet);
     console.log('TabletPortrait ' + Breakpoints.TabletPortrait);
     console.log('TabletLandscape ' + Breakpoints.TabletLandscape);
 
     console.log('Handset ' + Breakpoints.Handset);
     console.log('HandsetLandscape ' + Breakpoints.HandsetLandscape);
     console.log('HandsetPortrait ' + Breakpoints.HandsetPortrait);
 
     console.log('XSmall ' + Breakpoints.XSmall);
     console.log('Small ' + Breakpoints.Small);
     console.log('Medium ' + Breakpoints.Medium);
     console.log('Large ' + Breakpoints.Large);
     console.log('XLarge ' + Breakpoints.XLarge);*/

    // Pregunto si giro el dispositivo
    this.responsive.observe(Breakpoints.HandsetLandscape)
      .subscribe(result => {

        if (result.matches) {
          console.log("screens matches HandsetLandscape");
        }

      });

    // También puedes utilizar BreakpointObserverpara suscribirte a 
    // varios puntos de interrupción al mismo tiempo:
    this.responsive.observe([
      Breakpoints.TabletPortrait,
      Breakpoints.HandsetLandscape,
      Breakpoints.XSmall])
      .subscribe(result => {

        const breakpoints = result.breakpoints;

        if (breakpoints[Breakpoints.TabletPortrait]) {
          console.log("screens matches TabletPortrait");
        }
        else if (breakpoints[Breakpoints.HandsetLandscape]) {
          console.log("screens matches HandsetLandscape");
        }
        else if (breakpoints[Breakpoints.XSmall]) {
          console.log("Tamaño XSmall pantalla");
        }

      });

    /*let id = localStorage.getItem("idViaje");
    console.log('Valor variable local VIAJE: ' + id);
    if (id == '' || id == null) {
      this.buildForm();
    } else {
      //this.editable = true;
      console.log('EDITAR INSCRIPCION');
      //this.getSorteo(Number(id));
      //this.buildFormEdit()
    }*/
  }

  refreshPage() {
    window.location.reload();
    //this._document.defaultView.location.reload();
  }

  getIP() {
    this.ip.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
    });
  }

  getTokenViaje(id: number) {
    // Guardo el Token en el viaje
    this._viajeService.getTokenViaje(id)
      .subscribe((response: any) => {
        if (response.status == 'success') {
          console.log("Respuesta GET TOKEN");
          console.log(response.data);
          localStorage.setItem(this.globalService.getTokenName(), response.data.token);
        }
      }, error => {
        //console.error('Error:', error.error.message);
        console.log(error);
      });
  }

  

  private buildForm() {
    this.formDatos = new FormGroup({
      id: new FormControl({ value: null, disabled: true }, [Validators.required]),
      cedula: new FormControl({ value: null, disabled: false }, [Validators.required, Validators.maxLength(8)]),
      primer_nombre: new FormControl({ value: null, disabled: false }, [Validators.required]),
      segundo_nombre: new FormControl({ value: null, disabled: false }),
      primer_apellido: new FormControl({ value: null, disabled: false }, [Validators.required]),
      segundo_apellido: new FormControl({ value: null, disabled: false }),
      email: new FormControl({ value: null, disabled: false }, [Validators.required, Validators.email]),
      direccion: new FormControl({ value: null, disabled: false }, [Validators.required, Validators.maxLength(200)]),
      sexo: new FormControl({ value: null, disabled: false }, [Validators.required]),
      celular: new FormControl({ value: null, disabled: false }, [Validators.required]),
      fechaNac: new FormControl({ value: null, disabled: false }, [Validators.required]),
      grupo: new FormControl({ value: null, disabled: false }, [Validators.required]),
      itinerario: new FormControl({ value: null, disabled: false }, [Validators.required]),
    });

    this.formDatos.valueChanges
      .subscribe(value => {
        // console.log(value);
      });
  }

  recibirMensaje(mensaje: string) {
    this.msj = mensaje;
    console.log("MENSAJE DE COMPONENTE GRUPO: " + this.msj);
    if (this.msj == '') {
      this.visible = false;
    } else {
      this.viaje_nombre = this.msj;
    }
  }

  recibirOcultarGrupo(ocultar: boolean) {
    this.visible_grupo = ocultar;
    //console.log("TAMANIO DE COMPONENTE GRUPO: " + this.visible_grupo);
    if (this.visible_grupo) {
      this.ocultar_grupos = false;
    }
  }

  recibirOcultarItinerario(ocultar: boolean) {
    this.visible_itinerario = ocultar;
    //console.log("TAMANIO DE COMPONENTE GRUPO: " + this.visible_grupo);
    if (this.visible_itinerario) {
      this.ocultar_itinerarios = false;
    }
  }

  grupoSeleccionado(grupo: string) {
    console.log("SELECTED GRUPO: " + grupo);
    this.selectedGrupoPadre = Number(grupo);
    //Cargar Itinerarios para ese Grupo
    this.hijo.getItinerariosByGrupo(this.selectedGrupoPadre);

    this.formDatos.controls['grupo'].setErrors({ 'incorrect': true });
    this.formDatos.controls['grupo'].setErrors(null);

    // Seteo la validacion del combo itinerario al cambiar el grupo
    this.formDatos.controls['itinerario'].setValidators([Validators.required]);
    this.formDatos.controls['itinerario'].updateValueAndValidity();
    // console.log("Status Itinerario: " + this.formDatos.controls['itinerario'].status);
  }

  itinerarioSeleccionado(itinerario: string) {
    //console.log("SELECTED ITINERARIO: " + itinerario);
    this.selectedItinerarioPadre = Number(itinerario);

    this.formDatos.controls['itinerario'].setErrors({ 'incorrect': true });
    this.formDatos.controls['itinerario'].setErrors(null);
    this.mensaje_error = false;
    // console.log("Status Itinerario: " + this.formDatos.controls['itinerario'].status);
  }

  universidadSeleccionado(universidad: string) {
    console.log("SELECTED UNIVERSIDAD: " + universidad);
    this.selectedUniversidad = Number(universidad);
  }

  sexoChange(event: any) {
    this.selectedSexo = event.value;
    //console.log("SEXO SELECCIONADO: " +this.selectedSexo);
  }

  save(event: any) {
    console.log("Guardar Formulario");
    this.model.sexo = this.selectedSexo;
    this.model.viaje = this.viaje_id;
    this.model.grupo = this.selectedGrupoPadre;
    this.model.itinerario = this.selectedItinerarioPadre;
    this.model.universidad = this.selectedUniversidad;
    console.log(this.model);
    console.log("IP Cliente:");
    console.log(this.ipAddress);

    // Guardar Formuario de inscripcion
    this._viajeService.inscripcionViaje(this.model)
      .subscribe((response: any) => {
        if (response.status == 'success') {
          this.showSuccessMessage();
          this.refreshPage();
          console.log("Respuesta GUARDAR FORMULARIO");
          //console.log(response.data);
          //Cierro session con Token de Info y redirecciono a web
          //localStorage.setItem(this.globalService.getTokenName(), '');
        }
      }, error => {
        console.error('Error al borrar:', error.error.code);
        // Ya tiene un itinerario para ese Viaje 
        if (error.error.code == 401) {
          // Preguntar si desea cambiar de ITINERARIO
          this.showErrorMessage(error.error.message);
          this.showError(error.error.message);
          //this.button_cambio_iti = true;
          this.mensaje_error = true;
          this.itinerario_1_id = error.error.data_1;
          this.itinerario_1_nombre = error.error.data_2;
        }

        if (error.error.code == 402) {
          // Preguntar si desea cambiar de ITINERARIO
          //this.showErrorMessage(error.error.message);
          this.showError(error.error.message);
          this.mensaje_error = true;

          this.pasajero_id = error.error.data_5;
          this.itinerario_1_id = error.error.data_1;
          this.itinerario_1_nombre = error.error.data_2;
          this.itinerario_2_id = error.error.data_3;
          this.itinerario_2_nombre = error.error.data_4;

          this.openDialog();
        }
        //this.showErrorMessage(error.error.message);
        this.showError(error.error.message);
        this.mensaje_error = true;
      });

  }

  showError(res: any) {
    // Una forma es manejar códigos de error  
    this.error = res;
  }

  showErrorMessage(msg: string) {
    this.snackBar.open('Error guardando formulario inscripcion: ' + msg, 'Cerrar', {
      duration: 2000,
    });
  }

  showSuccessMessage() {
    this.snackBar.open('Formulario Inscripcion guardado con éxito', 'Cerrar', {
      duration: 2000,
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogCambioItinerarioComponent, {
      width: '250px',
      data: {
        pasajero_id: this.pasajero_id,
        Itinerario_1_id: this.itinerario_1_id,
        Itinerario_1_nombre: this.itinerario_1_nombre,
        Itinerario_2_id: this.itinerario_2_id,
        Itinerario_2_nombre: this.itinerario_2_nombre
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        //alert('Se cambio el itinerario');
        // Refrescar pantalla
        this.refreshPage();
      }
      if (result === 'cancel') {
        console.log('Se cancelo el cambio');
      }
    });

  }

}
