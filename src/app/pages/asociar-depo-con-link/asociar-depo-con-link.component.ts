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
  styleUrls: ['./asociar-depo-con-link.component.scss']
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

  public deposito_monto = 0;

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
    tipo: 'VISA_CBS',
    moneda: 'DOLARES',
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
    estado:'',
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
      //console.log(rowData);
      this.link = rowData;
      //console.log("link: " + this.link);
      this.talones = this.link.talones; //CARGO LOS TALONES DEL LINK DE PAGO
      //console.log("Talones en LINK DE PAGO");
      //console.log(this.talones);
      this.deposito_monto;
      for (let talon of this.link.talones) {
        // console.log(talon.Precio);
        this.deposito_monto += talon.Precio;
      }

      this.deposito.monto = this.deposito_monto;
      this.deposito.pasajero = this.link.idPasajero;
      this.comprador.nombre = this.link.nombreComprador + ' ' + this.link.apellidoComprador;
      this.comprador.celular = this.link.compradorCelular;
      this.comprador.email = this.link.compradorEmail;

      /***** SETEO DE LINK DE PAGOS DESDE LISTADO DE LINKS *****/
      this.linkPago.linkId = this.link.id;
      this.linkPago.pasajero.id = this.link.idPasajero;

      this.link.talones.forEach((ptalon: any) => {
        let talon = { id: 0, estado: "" };
        if (ptalon.Estado == 'Pendiente de Pago') {
          talon.id = ptalon.idTalon;
          talon.estado = ptalon.Estado;
          this.talonesSelec.push(talon);
        }
      });
    }
    //console.log("Talones seleccionados: ");
    //console.log(this.talonesSelec);
  }

  refreshPage() {
    //window.location.reload();
    window.location.href = '/dashboard/links';
  }

 updateLinkPagoRifa() {
    this._linkService.updateLinkPagoRifa(this.linkPago)
      .subscribe(response => {
        console.log("Respuesta de updateLinkPagoRifa(): " + response);
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

   /* console.log("valor monto (deposito): " + this.deposito.monto);
    console.log("valor tipo (deposito): " + this.deposito.tipo);
    console.log("valor pasajero (deposito): " + this.deposito.pasajero);*/

    this._depositosService
      .saveDepositoTarjeta(this.deposito, this.tarjeta)
      .subscribe((res: any) => {
        this.loading = false;
        this.step1message = res.message;
        //console.log(res);
        if (res.status == 'success') {
          this.depositoId = res.data;
          //console.log("Id deposito creado: " + res.data);
          this.step1result = true;
          this.asignarTalones();
        }
        this.linkPago.deposito.id = this.depositoId;
        this.linkPago.estado = "Pago";
        this.updateLinkPagoRifa();
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
  asignarTalones() {
    let selectedTalones: any[] = [];
    if (!this.validateComprador()) return false;
    this._rifaService
      .asignarDepositoATalones(this.depositoId, this.talonesSelec, this.comprador)
      .subscribe((res: any) => {
        //console.log("saldo " + this.saldoDeposito);
        //console.log(res);
        this.loading = false;
        if (res.status == 'success') {
          //console.log("saldo " + this.saldoDeposito);
          this.step = 2;
          this.bigTitle = 'DEPÓSITO ASIGNADO A RIFAS';
        }
      });
  }

}

