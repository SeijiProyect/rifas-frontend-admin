import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/common/global.service';

//TODO: Check this imports
import { PasajeroService } from 'src/app/services/pasajero.service';
import { PersonaService } from 'src/app/services/persona.service';
import { UniversidadService } from 'src/app/services/universidad.service';
import { ViajeService } from 'src/app/services/viaje.service';
import { ItinerarioService } from 'src/app/services/itinerario.service';
import { GrupoService } from 'src/app/services/grupo.service';

@Component({
  selector: 'app-persona-add',
  templateUrl: './persona-add.component.html',
})
export class PersonaAddComponent implements OnInit {
  public loading: boolean = false;
  public createUser = true;
  public createPasajero = true;
  public rolesList = [
    { name: 'Estudiante', value: 'ROLE_VENDEDOR', status: false },
    { name: 'Admin', value: 'ROLE_ADMIN', status: false },
  ];
  public step1message = '';
  public step2message = '';
  public step3message = '';
  public universidades: any;
  public viajes: any;
  public itinerarios: any;
  public grupos: any;
  public selectedViaje: any = undefined;
  public selectedGrupo: any = undefined;

  //TODO: Check unused variables
  public bigTitle: string = 'NUEVA PERSONA';
  public pasajerosLoading: boolean = true;
  public pasajeros: any;
  public errorTxt = '';
  public step = 1;
  public depositoId = 0;
  public step1result = false;
  public saldoDeposito = 0;
  public pagoPersonalMonto = 0;
  public talones: any[] = [];
  public persona = {
    nombres: '',
    apellidos: '',
    birthDate: new Date(),
    address: '',
    cedula: '',
    phone: '',
    idExterno: '',
  };
  public user = {
    email: '',
    rol: '',
    password: undefined,
  };
  public pasajero = {
    itinerario: undefined,
    universidad: undefined,
    acompanante: undefined,
    estado: 'Activo',
    comentario: '',
    pasajero: undefined,
    geopay: false,
  };

  constructor(
    private _pasajeroService: PasajeroService,
    private _personasService: PersonaService,
    private _universidadService: UniversidadService,
    private _viajeService: ViajeService,
    private _itinerarioService: ItinerarioService,
    private _grupoService: GrupoService,
    public router: Router,
    public globalService: GlobalService
  ) {}

  async ngOnInit() {
    // this.changeStep(3);
    await this.getPasajeros();
    await this.getUniversidades();
    await this.getViajes();
  }

  getPasajeros() {
    this.loading = true;
    this._pasajeroService.getPasajerosList().subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        this.pasajeros = response.data;
      }
      this.loading = false;
      this.pasajerosLoading = false;
    });
  }

  getUniversidades() {
    this.loading = true;
    this._universidadService
      .getUniversidadesList()
      .subscribe((response: any) => {
        let status = response.status;

        if (status != 'success') {
          status = 'error';
        }

        if (status == 'success') {
          this.universidades = response.data;
        }
        this.loading = false;
        // this.pasajerosLoading = false;
      });
  }

  getViajes() {
    this.loading = true;
    this._viajeService.getViajesList().subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        this.viajes = response.data;
      }
      this.loading = false;
    });
  }

  getItinerarios() {
    this.loading = true;
    this._itinerarioService
      .getItinerariosList(this.selectedViaje)
      .subscribe((response: any) => {
        let status = response.status;

        if (status != 'success') {
          status = 'error';
        }

        if (status == 'success') {
          this.itinerarios = response.data;
        }
        this.loading = false;
      });
  }

  getGrupos() {
    this.loading = true;
    this._grupoService
      .getGruposByViaje(this.selectedViaje)
      .subscribe((response: any) => {
        let status = response.status;

        if (status != 'success') {
          status = 'error';
        }

        if (status == 'success') {
          this.grupos = response.data;
        }
        this.loading = false;
      });
  }

  universidadChange(event: any) {
    this.pasajero.universidad = event.value;
  }

  itinerarioChange(event: any) {
    this.pasajero.itinerario = event.value;
  }

  pasajeroChange(event: any) {
    this.pasajero.acompanante = event.value;
  }

  estadoChange(event: any) {
    this.pasajero.estado = event.value;
  }

  grupoChange(event: any) {
    this.selectedGrupo = event.value;
    this.getItinerarios();
  }

  viajeChange(event: any) {
    this.selectedViaje = event.value;
    this.getGrupos();
  }

  continue() {
    if (this.step == 1) {
      if (!this.validatePersona()) return false;
      this.loading = true;
      this.step1message = '';
      this.changeStep(2);
      return;
    }

    if (this.step == 2) {
      if (!this.validateUser() && this.createUser) return false;
      this.loading = true;
      this.step2message = '';
      this.changeStep(3);
      return;
    }

    if (this.step == 3) {
      if (!this.validatePasajero() && this.createPasajero) return false;
      this.loading = true;
      this.step3message = '';
      this.changeStep(4);
      return;
    }

    return;
  }

  guardar() {
    if (!this.validatePersona()) return false;
    this.loading = true;
    this.step1message = '';

    // this._depositosService
    //   .saveDepositoTarjeta(this.deposito, this.tarjeta)
    //   .subscribe((res: any) => {
    //     this.loading = false;
    //     this.step1message = res.message;

    //     if (res.status == 'success') {
    //       this.depositoId = res.data;
    //       this.changeStep(2);
    //       this.step1result = true;
    //     }
    //   });
  }

  validatePersona() {
    if (this.persona.nombres == '') {
      this.errorTxt = 'Debes completar el nombre';
      return false;
    }

    if (this.persona.apellidos == '') {
      this.errorTxt = 'Debes completar el apellido';
      return false;
    }

    if (this.persona.cedula == '') {
      this.errorTxt = 'Debes completar la cédula';
      return false;
    }

    if (this.persona.phone == '') {
      this.errorTxt = 'Debes completar el celular';
      return false;
    }

    return true;
  }

  validateUser() {
    if (this.user.email == '') {
      this.step2message = 'Debes completar el email';
      return false;
    }

    let roleFlag = false;
    this.rolesList.forEach((role) => {
      if (role.status) {
        roleFlag = true;
      }
    });

    if (!roleFlag) {
      this.step2message = 'Debes seleccionar al menos un rol';
      return false;
    }

    return true;
  }

  validatePasajero() {
    if (!this.createPasajero) return true;

    if (
      this.pasajero.universidad == '' ||
      this.pasajero.universidad == undefined
    ) {
      this.errorTxt = 'Debes seleccionar una universidad';
      return false;
    }
    
    if (
      this.pasajero.itinerario == '' ||
      this.pasajero.itinerario == undefined
    ) {
      this.errorTxt = 'Debes seleccionar un itinerario';
      return false;
    }
    
    if (
      this.pasajero.estado == '' ||
      this.pasajero.estado == undefined
    ) {
      this.errorTxt = 'Debes seleccionar un estado';
      return false;
    }

    return true;
  }

  async changeStep(pStep: number) {
    if (pStep == 1) {
      this.bigTitle = 'NUEVA PERSONA';
    } else if (pStep == 2) {
      this.bigTitle = 'INGRESAR USUARIO';
    } else if (pStep == 3) {
      this.bigTitle = 'INGRESAR PASAJERO';
    } else if (pStep == 4) {
      this.bigTitle = 'ESTOS SON LOS DATOS INGRESADOS:';
    }

    this.step = pStep;

    this.loading = false;
  }
}
