import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RifaService } from 'src/app/services/rifa.service';
import { SorteoService } from 'src/app/services/sorteo.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Organizador } from 'src/app/models/organizador.model';
import { Rifa } from 'src/app/models/rifa.model';
import { Sorteo } from 'src/app/models/sorteo.model';
import { MatDialog } from '@angular/material/dialog';
import { PasajerosDialogComponent } from '../../pasajeros/pasajeros-dialog/pasajeros-dialog.component';
import { SorteosCheckboxComponent } from '../../sorteos/sorteos-checkbox/sorteos-checkbox.component';
import { PasajeroService } from 'src/app/services/pasajero.service';
import { validarQueSeanIguales } from 'src/app/common/app.validator';

@Component({
  selector: 'app-rifas-entrega',
  templateUrl: './rifas-entrega.component.html',
  styleUrls: ['./rifas-entrega.component.scss']
})
export class RifasEntregaComponent implements OnInit {

  @ViewChild(SorteosCheckboxComponent) hijo!: SorteosCheckboxComponent;
  organizador_1: Organizador = {
    id: 1,
    nombre: 'De Toque y Toque'
  };
  public selectedOrganizador = this.organizador_1;

  form: FormGroup = new FormGroup({});
  today: Date = new Date();
  rifa_1: Rifa = {
    id: 0,
    nombre: '',
    descripcion: '',
    fecha_inicio: this.today,
    fecha_fin: this.today,
    organizador: this.organizador_1,
  };

  public selectedRifa = this.rifa_1;
  rifa_id = 0;

  sorteo_1: Sorteo = {
    id: 0,
    fecha_sorteo: this.today,
    rifa: this.rifa_1,
    numero_sorteo: 1,
    lugar: 'Direccion Nacional de Loterias y Quinielas',
    numero_inicial_talon: 0,
    numero_final_talon: 0,
    talon_valor: 20,
    porcentaje_comision: 20,
  };
  public selectedSorteo = this.sorteo_1;
  public rifas: any[] = [];
  public sorteos: any[] = [];
  public numeros_asignados: any[] = [];
  model: any = {
    id: 0,
    rifa: this.rifa_1,
    sorteos: this.sorteos,
    desde: 0,
    hasta: 0,
    pasajero: 0,
  };
  editable = false;
  visible = false;

  // Carga Dinamica de pasajeros
  public loading: boolean = false;
  public pasajerosLoading: boolean = true;
  public pasajeros: any;
  public selectedPasajero = 0;

  error: string = 'Error';
  mensaje_error: boolean = false;

  snackBarRef: any;

  constructor(private _pasajeroService: PasajeroService, public dialog: MatDialog, private _rifaService: RifaService,
    private snackBar: MatSnackBar, private http: HttpClient) {
    this.buildForm();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PasajerosDialogComponent, {
      //data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  ngOnInit(): void {
    this.getRifasActivas();
    this.getPasajeros();
  }

  private buildForm(): void {
    this.form = new FormGroup({
      // id: new FormControl({ value: null, disabled: false }, [Validators.required]),
      sorteos: new FormControl({ value: null, disabled: false }, [Validators.required]),
      rifa: new FormControl({ value: null, disabled: false }, [Validators.required]),
      desde: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.min(1)]),
      hasta: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.min(1)]),
      pasajeros: new FormControl({ value: null, disabled: false }, [Validators.required]),
    });

    this.form.valueChanges
      .subscribe(value => {
        console.log(value);
      });
  }

  /*checarSiSonIguales(): boolean {
    return this.form.hasError('noSonIguales') &&
      this.form.get('desde')?.value &&
      this.form.get('hasta')?.value;
  }*/

  private listaSorteosChecked(): any[] {
    let sorteos: any[] = [];

    for (let sorteo of this.sorteos) {
      if (sorteo.checked == true) {
        sorteos.push(sorteo);
      }
    }
    return sorteos;
  }

  private verificarNumeroEsteRangoSorteo() {
    this.model.desde;
    this.model.hasta;
    console.log("Verifico numero en rango de sorteo");
    for (let sorteo of this.model.sorteos) {
      console.log("Numero Inicial: " + sorteo.numero_inicial);
      console.log("Numero FINAL: " + sorteo.numero_final);
      if (sorteo.numero_inicial > this.model.desde) {
        console.log("CONDICION: sorteo.numero_inicial > this.model.desde " + sorteo.numero_inicial);
        return false;
      }

      if (sorteo.numero_final < this.model.hasta) {
        console.log("CONDICION: sorteo.numero_final < this.model.hasta " + sorteo.numero_final);
        return false;
      }
    }
    return true;
  }

  refreshPage() {
    window.location.reload();
  }

  getValidarSorteos(e: any) {
    if (e) {
      this.form.controls['sorteos'].setValue(e);
    } else {
      this.form.controls['sorteos'].setValue(null);
    }
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
        console.log("Listado de pasajeros: " + this.pasajeros[0].nombres);
      }
      this.loading = false;
      this.pasajerosLoading = false;
    });
  }

  pasajeroChange(event: any) {
    this.selectedPasajero = event; // ID de pasajero
    this.form.controls['pasajeros'].setValue(this.selectedPasajero);
    // console.log("Pasajero seleccionado: " + this.selectedPasajero);
  }

  rifaChange(event: any) {
    this.visible = true;
    this.selectedRifa = event.value;
    //console.log("RIFA SELECCIONADO: " + this.selectedRifa);

    // Verifico si es la primer carga de los CheckBox Sorteos
    if (this.rifa_id == 0) {
      this.rifa_id = Number(this.selectedRifa);
    } else {
      this.hijo.listaSorteosByRifa(Number(this.selectedRifa));
    }

  }

  sorteoChange(event: any) {
    this.selectedSorteo = event.value;
    //console.log("SEXO SELECCIONADO: " +this.selectedSexo);
  }

  getRifasActivas() {
    this._rifaService.getRifasActivas().subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        let rifas = response.data;
        let rifaAux;
        for (let rifa of rifas) {
          rifaAux = {
            rifa_id: Number(rifa.rifa_id),
            organizador_id: Number(rifa.organizacion_id),
            rifa_nombre: rifa.rifa_nombre,
            rifa_descripcion: rifa.rifa_descripcion,
            rifa_fechaInicio: rifa.rifa_fecha_inicio,
            rifa_fechaFin: rifa.rifa_fecha_fin
          }
          this.rifas.push(rifaAux);
        }
      }
    });
  }
  
  save(event: any) {
    this.numeros_asignados = [];
    this.sorteos = this.hijo.sorteos;
    //console.log("Guardar Sorteo");
    this.model.rifa = this.selectedRifa;
    this.model.pasajero = this.selectedPasajero;
    this.model.sorteos = this.listaSorteosChecked();

    if (!this.verificarNumeroEsteRangoSorteo()) {
      this.showErrorMessage("El numero no esta dentro del rango del Sorteo");
      return;
    }

    if (this.model.desde > this.model.hasta) {
      this.showErrorMessage("El numero inicial es mayor!!!");
      this.form.controls['desde'].setValue(0);
      this.form.controls['hasta'].setValue(0);
      return;
    }

    if (this.form.valid) {
      console.log('OK datos validos');
      console.log(this.model);
      this._rifaService.entregaRifas(this.model)
        .subscribe((response: any) => {
          if (response.status == 'test') {
            this.showSuccessMessage();
            //this.refreshPage();
            console.log("Test: Respuesta ENTREGA NUMEROS");
            console.log(response.data);
          }
          if (response.status == 'success') {
            this.showSuccessMessage();
            this.refreshPage();
            //  console.log("Respuesta GUARDAR SORTEO");
            //  console.log(response.data);
          }
          if (response.status == 'error') {
            // console.log(response.message);
            this.showError(response.data);
            //this.showErrorMessage(response.message);

            //this.openSnackBar2("error","cerrar");
            this.mensaje_error = true;

            //Mostrar numeros ya asignados
            //  console.log("Numeros ya Asignados");
            //  console.log(response.data);

            let numeros = response.data;
            let numeroAux;
            for (let numero of numeros) {
              numeroAux = {
                numero_id: Number(numero.id),
                numero: Number(numero.Numero),
                precio: numero.Precio,
                estado: numero.Estado,
                numero_sorteo: numero.SorteoNumero,
                fecha_sorteo: numero.FechaSorteo,
                nombres_pasajero: numero.pasajero_nombres,
                apellidos_pasajero: numero.pasajero_apellidos,
              }
              this.numeros_asignados.push(numeroAux);
            }

            //this.closeSnackBar();
            console.log("Array numeros asignados");
            console.log(this.numeros_asignados);
          }

        }, error => {
          this.mensaje_error = true;
         // this.showError(Response);
          //console.error('Error al guardar el Sorteo:', error);
          //this.showErrorMessage("Error al procesar la peticion");
        });

    } else {
      console.log("Datos INVALIDOS");
      console.log(this.form.value);
    }
  }
  showErrorMessage(mensaje: string) {
    /* this.snackBarRef = this.snackBar.open('No se pudo guardar: ' + mensaje, 'Cerrar', {
       duration: 2000,
     });*/

    this.openSnackBar('No se pudo guardar: ' + mensaje, 'Cerrar');
  }

  showError(res: any) {
    // Si el error es que ya existe ese id de empleado, mostrar el mensaje apropiado
    // Una forma es manejar códigos de error  
    this.error = 'Estos numeros ya estan asignados';
  }

  showSuccessMessage() {
    this.snackBar.open('Se guardo con éxito', 'Cerrar', {
      duration: 2000,
    });
  }
  openSnackBar(message: string, action: string) {
    this.snackBarRef = this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  openSnackBar2(mensaje: string, acción: string) {
    this.snackBar.open(mensaje, acción, {
      duration: 2000,
    });
  }
  closeSnackBar() {
    if (this.snackBarRef) this.snackBarRef.dismiss(); //Revisar primero si la referencia existe
    this.snackBarRef = null;
  }


}
