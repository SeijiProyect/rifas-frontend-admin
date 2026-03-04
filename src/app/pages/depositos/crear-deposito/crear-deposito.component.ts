import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/common/global.service';
import { DepositosService } from 'src/app/services/depositos.service';
import { PagoPersonalService } from 'src/app/services/pago-personal.service';
import { PasajeroService } from 'src/app/services/pasajero.service';
import { RifaService } from 'src/app/services/rifa.service';


@Component({
  selector: 'app-crear-deposito',
  templateUrl: './crear-deposito.component.html',
})
export class CrearDepositoComponent implements OnInit {
  public loading: boolean = false;
  public bigTitle: string = 'DEPÓSITO/TARJETA INGRESADOS CORRECTAMENTE';
  public pasajerosLoading: boolean = true;
  public pasajeros: any;
  public errorTxt = '';
  public step = 1;
  public depositoId = 0;
  public step1result = false;
  public step1message = '';
  public saldoDeposito = 0;
  public pagoPersonalMonto = 0;
  //public talones: any[] = [];
  public talones: any;
  public deposito = {
    monto: 0,
    fecha: new Date(),
    hora: '',
    tipo: 'Contado',
    comentario: '',
    pasajero: '',
    geopay: false,
  };
  public tarjeta = {
    tipo: '',
    moneda: '',
    cuotas: 1,
    codAut: '',
    nroTarjeta: '',
    emisor: '',
  };
  public comprador = {
    nombre: '',
    email: '',
    celular: '',
    departamento: '',
  };
  public depositoDate: Date | null = new Date();

  constructor(
    private _pasajeroService: PasajeroService,
    private _depositosService: DepositosService,
    private _pagoPersonalService: PagoPersonalService,
    private _rifaService: RifaService,
    public router: Router,
    public globalService: GlobalService
  ) { }

  async ngOnInit() {
    await this.getPasajeros();
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

  pasajeroChange(event: any) {
    // this.selectedPasajero = event;
    //console.log("Valor pasajero: " + event);
    this.deposito.pasajero = event;
  }

  tipoDepositoChange(event: any) {
    this.deposito.tipo = event.value;
  }

  tipoTarjetaChange(event: any) {
    this.tarjeta.tipo = event.value;
  }

  monedaChange(event: any) {
    this.tarjeta.moneda = event.value;
  }

  departamentoChange(event: any) {
    this.comprador.departamento = event.value;
  }

  guardar() {
    if (!this.validateDeposito()) return false;
    this.loading = true;
    this.step1message = '';

    this._depositosService
      .saveDepositoTarjeta(this.deposito, this.tarjeta)
      .subscribe((res: any) => {
        this.loading = false;
        this.step1message = res.message;

        if (res.status == 'success') {
          this.depositoId = res.data;
          this.changeStep(2);
          this.step1result = true;
        }
      });
  }

  validateDeposito() {
    if (this.deposito.monto <= 0) {
      this.errorTxt = 'El depósito debe ser mayor a 0';
      return false;
    }

    if (this.deposito.pasajero == '') {
      this.errorTxt = 'Debes seleccionar un pasajero';
      return false;
    }

    if (this.deposito.hora == '') {
      this.errorTxt = 'Debes completar la hora';
      return false;
    }

    if (this.deposito.tipo == 'Credito' || this.deposito.tipo == 'Debito') {
      if (this.tarjeta.tipo == '') {
        this.errorTxt = 'Debes completar el tipo de tarjeta';
        return false;
      }

      if (this.tarjeta.moneda == '') {
        this.errorTxt = 'Debes seleccionar el tipo de tarjeta';
        return false;
      }

      if (this.tarjeta.codAut == '') {
        this.errorTxt = 'Debes completar el código de autorización';
        return false;
      }
    }

    return true;
  }

  validateComprador() {
    if (this.comprador.nombre == '') {
      this.errorTxt = 'Debes completar el nombre del comprador';
      return false;
    }

    return true;
  }

  asociarRifasStep() {
    this.changeStep(3);

    this.getTalonesPasajero();
  }

  getSaldoDeposito() {
    this._depositosService.getSaldo(this.depositoId).subscribe((res: any) => {
      this.saldoDeposito = res.data;
    });
  }

  /* getRifas() {
     //pageRegisterLimit
     this.loading = true;
     this._rifaService
       .getRifasNew(
         this.loteDatos,
         this.pageRegisterLimit,
         this.pageIndex,
         this.selectedStatus,
         this.desdeValue,
         this.hastaValue,
         this.selectedPasajero,
         this.selectedRifa,
         this.selectedSorteo
       )
       .subscribe((response: any) => {
         let status = response.status;
 
         if (status != 'success') {
           status = 'error';
         }
 
         if (status == 'success') {
           // this.aux_lote_talones = [];
           this.rifas = response.data.rifas;
 
           for (let item of this.rifas) {
             this.aux_lote_talones.push(item);
           }
           this.totalTalones = response.data.totalTalones;
           this.mostrarPaginado();
 
         }
         this.loading = false;
       });
   }*/

  getTalonesPasajero() {
    let lPasajero: any = '';

    if (this.deposito.pasajero != null) {
      lPasajero = this.deposito.pasajero;
    }

    console.log("Pasajero seleccionado Id:");
    console.log(lPasajero);

    /*this._rifaService
      .getRifas(0, 'Pendiente de Pago', '', '', lPasajero, true)
      .subscribe((res: any) => {
        console.log("servicio viejo de talones");
        console.log(res.data.talones);
        this.talones = res.data.talones;
      });*/

    this._rifaService
      .getRifasNew(
        0,
        100,
        0,
        'Pendiente de Pago',
        '',
        '',
        lPasajero,
        'todos',
        'todos'
      )
      .subscribe((response: any) => {
        let status = response.status;

        if (status != 'success') {
          status = 'error';
        }

        if (status == 'success') {
          // this.aux_lote_talones = [];
          let rifas = response.data.rifas;
          console.log("servicio NUEVO de talones");
          console.log(response.data);
          this.talones = response.data.rifas;

          /*for (let item of rifas) {
           this.talones.push(item);
          }*/


        }
        //this.loading = false;
      });
  }

  asociarPagoPersonalStep() {
    this.changeStep(4);
  }

  nada() {
    this.router.navigate(['/dashboard/depositos']);
  }

  asignarTalones() {
    console.log("Dentro de asignar Talones");
    let selectedTalones: any[] = [];

    if (!this.validateComprador()) return false;

    this.talones.forEach((rifa: any) => {
      let sorteos = rifa.Sorteos;
      sorteos.forEach((talon: any) => {
        if (talon.selected) {
          selectedTalones.push(talon.id_talon);
        }
      });
    });

    if (selectedTalones.length == 0) return false;

    this.loading = true;

    console.log("Selected talones: " + selectedTalones);

    console.log("Selected talones es array: " + Array.isArray(selectedTalones));

    this._rifaService
      .asignarDepositoATalones(this.depositoId, selectedTalones, this.comprador)
      .subscribe((res: any) => {
        this.loading = false;

        if (res.status == 'success') {
          this.changeStep(2);
          this.bigTitle = 'DEPÓSITO ASIGNADO A RIFAS';
        }
      });
  }

  guardarPagoPersonal() {
    if (this.pagoPersonalMonto <= 0) return false;

    this.loading = true;

    this._pagoPersonalService
      .savePagoPersonal(this.pagoPersonalMonto, this.depositoId)
      .subscribe((res: any) => {
        this.loading = false;

        if (res.status == 'success') {
          this.changeStep(2);
          this.bigTitle = 'PAGO PERSONAL GUARDADO CORRECTMENTE';
        }
      });
  }

  seleccionarTalon(talon: any) {
    if (talon.Precio > this.saldoDeposito) return false;

    if (!talon.selected) {
      talon.selected = true;
      this.saldoDeposito -= talon.Precio;
    } else {
      this.saldoDeposito += talon.Precio;
      talon.selected = false;
    }
  }

  async changeStep(pStep: number) {
    if (pStep == 2 || pStep == 3 || pStep == 4) {
      await this.getSaldoDeposito();
    }

    this.step = pStep;
  }
}
