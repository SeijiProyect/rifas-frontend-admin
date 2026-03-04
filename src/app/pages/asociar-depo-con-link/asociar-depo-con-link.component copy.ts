import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LinksService } from '../../services/links.service';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/common/global.service';
import { DepositosService } from 'src/app/services/depositos.service';
import { PagoPersonalService } from 'src/app/services/pago-personal.service';
import { PasajeroService } from 'src/app/services/pasajero.service';
import { RifaService } from 'src/app/services/rifa.service';
import { Talon } from 'src/app/models/talon.model';

@Component({
  selector: 'app-asociar-depo-con-link',
  templateUrl: './asociar-depo-con-link.component.html',
})
export class AsociarDepoConLinkComponent implements OnInit {
  link: any = {};
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
  public idsTalones: any[] = [];

  public talon = { id: 0, estado: '' };
  public talones: Talon[] = [];
  public talonesSelec: Talon[] = [];

  public deposito = {
    monto: 0,
    fecha: new Date(),
    hora: '00:00:00',
    tipo: 'Contado',
    comentario: 'Procesado a mano.',
    pasajero: '',
    geopay: true, // Cambiado a always true
  };
  public tarjeta = {
    tipo: '',
    moneda: 'Dolares',
    cuotas: 1,
    codAut: '',
    nroTarjeta: '',
    emisor: '',
  };
  public comprador = {
    nombre: '',
    email: '',
    celular: '',
    departamento: 'Montevideo',
  };
  public linkPago = {
    linkId: 1,
    pasajero: {
      id: 2,
      nombre: '',
      apellido: '',
      email: '',
      departamento: '',
      celular: '',
    },
    deposito: {
      id: 1,
      talones: 5,
      saldo: 100,
    },
    comprador_nombre: '',
    comprador_apellido: '',
    comprador_email: '',
    comprador_departamento: '',
    comprador_celular: '',
  };

  public depositoDate: Date | null = new Date();

  constructor(
    private _linkService: LinksService,
    private route: ActivatedRoute,
    private _pasajeroService: PasajeroService,
    private _depositosService: DepositosService,
    private _pagoPersonalService: PagoPersonalService,
    private _rifaService: RifaService,
    public router: Router,
    public globalService: GlobalService
  ) { }

  async ngOnInit() {
    await this.getPasajeros();

    let storedRow = localStorage.getItem("selectedRow");
    if (storedRow) {
      let rowData = JSON.parse(storedRow);
      console.log("1:             " + rowData);
      this.link = rowData;
      console.log(this.link);

      this.talones = this.link.talones; //CARGO LOS TALONES DEL LINK DE PAGO
      this.deposito.monto = this.link.talones.length * 20;
      this.deposito.pasajero = this.link.idPasajero;
      this.comprador.nombre = this.link.nombreComprador + ' ' + this.link.apellidoComprador;
      this.comprador.celular = this.link.compradorCelular;
      this.comprador.email = this.link.compradorEmail;

      /***** SETEO DE LINK DE PAGOS DESDE LISTADO DE LINKS *****/
      this.linkPago.linkId = this.link.id;
      this.linkPago.pasajero.id = this.link.idPasajero;

     /* console.log("Comprador nombre: " + this.comprador.nombre);
      console.log("comptador celular: " + this.comprador.celular);
      console.log("comprador email: " + this.comprador.email);
      console.log("Monto talones: " + this.link.talones.length * 20);
      console.log("Id pasajero: " + this.link.idPasajero);
      console.log("Talones de link de pago");
      console.log(this.link.talones);*/

      this.link.talones.forEach((ptalon: any) => {
        let talon = { id: 0, estado: "" };
        if (ptalon.Estado == 'Pendiente de Pago') {
          talon.id = ptalon.idTalon;
          talon.estado = ptalon.Estado;
          this.talonesSelec.push(talon);
        }
      });
    }

    console.log("Talones seleccionados: ");
    console.log(this.talonesSelec);
  }

  getLinkPagoRifa() {
    this._linkService.getLinkPagoRifa(this.linkPago)
      .subscribe(response => {
        console.log("Respuesta de getLinkPagoRifa(): " + response);
      });
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
    this.deposito.pasajero = event;
  }

  tipoDepositoChange(event: any) {
    this.deposito.tipo = event.value;
  }

  tipoTarjetaChange(event: any) {
    this.tarjeta.tipo = event.value;
  }

  nroCuotas(event: any) {
    this.tarjeta.cuotas = event.value;
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

    console.log("valor monto (deposito): " + this.deposito.monto);
    console.log("valor tipo (deposito): " + this.deposito.tipo);
    console.log("valor pasajero (deposito): " + this.deposito.pasajero);

    this._depositosService
      .saveDepositoTarjeta(this.deposito, this.tarjeta)
      .subscribe((res: any) => {
        this.loading = false;
        this.step1message = res.message;
        //console.log(res);
        if (res.status == 'success') {
          this.depositoId = res.data;
          console.log("Id deposito creado: " + res.data);
          /* this.changeStep(2); */ // Se comentó esto y se agregó el método de abajo
          this.asociarRifasStep();
          this.saldoDeposito = - (this.link.talones.length * 20);
          //this.seleccionarTalon();
          this.step1result = true;
        }

        this.linkPago.deposito.id = this.depositoId;
        this.getLinkPagoRifa();
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
    //this.getTalonesPasajero();
  }

  getSaldoDeposito() {
    this._depositosService.getSaldo(this.depositoId).subscribe((res: any) => {
      console.log("Respuesta" + res.data);
      this.saldoDeposito = res.data;
    });
  }

  asignarTalones() {
    let selectedTalones: any[] = [];

    if (!this.validateComprador()) return false;

    this._rifaService
      .asignarDepositoATalones(this.depositoId, this.talonesSelec, this.comprador)
      .subscribe((res: any) => {
        console.log("saldo " + this.saldoDeposito);
        console.log(res);
        this.loading = false;

        if (res.status == 'success') {
          console.log("saldo " + this.saldoDeposito);
          this.changeStep(2);
          this.bigTitle = 'DEPÓSITO ASIGNADO A RIFAS';
        }
      });
  }

  /*seleccionarTalon() {
    this.saldoDeposito = - (this.link.talones.length * 20);
    console.log("Deposito con descuento de talones: " + this.saldoDeposito);

  }*/

  async changeStep(pStep: number) {
    if (pStep == 2 || pStep == 3 || pStep == 4) {
      await this.getSaldoDeposito();
    }
    this.step = pStep;
  }
}

