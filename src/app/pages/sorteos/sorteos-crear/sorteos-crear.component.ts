import { Component, OnInit } from '@angular/core';
import { Rifa } from 'src/app/models/rifa.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Organizador } from 'src/app/models/organizador.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RifaService } from 'src/app/services/rifa.service';
import { HttpClient } from '@angular/common/http';
import { SorteoService } from 'src/app/services/sorteo.service';
import { Sorteo } from 'src/app/models/sorteo.model';

@Component({
  selector: 'app-sorteos-crear',
  templateUrl: './sorteos-crear.component.html',
  styleUrls: ['./sorteos-crear.component.scss']
})
export class SorteosCrearComponent implements OnInit {

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

  public selectedRifa?: Rifa;
  //public selectedRifa: number = 0;
  model: Sorteo = {
    id: 0,
    fecha_sorteo: this.today,
    rifa: this.selectedRifa,
    numero_sorteo: 1,
    lugar: 'Direccion Nacional de Loterias y Quinielas',
    numero_inicial_talon: 0,
    numero_final_talon: 0,
    talon_valor: 20,
    porcentaje_comision: 20,
  };
  editable = false;
  fecha_valida = false;
  error: string = 'Error';
  mensaje_error: boolean = false;

  public rifas: any[] = [];

  constructor(private _rifaService: RifaService, private _sorteoService: SorteoService, private http: HttpClient,
    private snackBar: MatSnackBar) {
    /* let id = localStorage.getItem("idRifa");
     console.log("RIFA SELECCIONADA: " + id);
     this.selectedRifa = Number(id);*/
    //this.buildForm();
    this.getRifasActivas();
  }

  ngOnInit(): void {
    this.getRifasActivas();
    let id = localStorage.getItem("idSorteo");
    console.log('Valor variable local sorteo: ' + id);
    if (id == '' || id == null) {
      this.buildForm();
    } else {
      this.editable = true;
      console.log('EDITAR SORTEO');
      this.getSorteo(Number(id));
      this.buildFormEdit()
    }
  }

  private buildForm() {
    //console.log("VALOR DE ID RIFAS EN FormControl: " + this.selectedRifa);
    let id = localStorage.getItem("idRifa");
    console.log("RIFA SELECCIONADA EN FormControl: " + id);
    this.rifa_1 = {
      id: Number(id),
      nombre: '',
      descripcion: '',
      fecha_inicio: this.today,
      fecha_fin: this.today,
      organizador: this.organizador_1,
    };
    this.selectedRifa = this.rifa_1;
    this.form = new FormGroup({
      // id: new FormControl({ value: null, disabled: false }, [Validators.required]),
      fecha_sorteo: new FormControl({ value: null, disabled: false }, [Validators.required]),
      numero_sorteo: new FormControl({ value: null, disabled: false }, [Validators.required, Validators.min(1)]),
      rifa: new FormControl({ value: Number(id), disabled: true }, [Validators.required]),
      lugar: new FormControl({ value: null, disabled: false }, [Validators.required]),
      numero_inicial_talon: new FormControl({ value: null, disabled: false }, [Validators.required, Validators.min(1)]),
      numero_final_talon: new FormControl({ value: null, disabled: false }, [Validators.required, Validators.min(1)]),
      talon_valor: new FormControl({ value: null, disabled: false }, [Validators.required, Validators.min(1)]),
      porcentaje_comision: new FormControl({ value: null, disabled: false }, [Validators.required, Validators.min(1)]),
    });

    this.form.valueChanges
      .subscribe(value => {
        this.mensaje_error = false;
        //console.log(value);
      });
  }

  private buildFormEdit() {
    //console.log("VALOR DE ID RIFAS EN FormControl: " + this.selectedRifa);
    let id = localStorage.getItem("idRifa");
    console.log("RIFA SELECCIONADA EN FormControl: " + id);
    //var fecha = response.data.fecha_sorteo.date == 'null' ? new Date() : new Date(response.data.fecha_sorteo.date);
    console.log("FECHA ACTUAL: " + this.today);
    console.log("FECHA SORTEO EDIT: " + this.model.fecha_sorteo);
    console.log("OBJ SORTEO: ");
    console.log(this.model);

    this.rifa_1 = {
      id: Number(id),
      nombre: '',
      descripcion: '',
      fecha_inicio: this.today,
      fecha_fin: this.today,
      organizador: this.organizador_1,
    }; ""
    this.selectedRifa = this.rifa_1;
    this.form = new FormGroup({
      // id: new FormControl({ value: null, disabled: false }, [Validators.required]),
      fecha_sorteo: new FormControl({ value: null, disabled: false }, [Validators.required]),
      numero_sorteo: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.min(1)]),
      rifa: new FormControl({ value: Number(id), disabled: true }, [Validators.required]),
      lugar: new FormControl({ value: null, disabled: false }, [Validators.required]),
      numero_inicial_talon: new FormControl({ value: null, disabled: false }, [Validators.required, Validators.min(1)]),
      numero_final_talon: new FormControl({ value: null, disabled: false }, [Validators.required, Validators.min(1)]),
      talon_valor: new FormControl({ value: null, disabled: false }, [Validators.required, Validators.min(1)]),
      porcentaje_comision: new FormControl({ value: null, disabled: false }, [Validators.required, Validators.min(1)]),
    });

    this.form.valueChanges
      .subscribe(value => {
        this.mensaje_error = false;
        //console.log(value);
      });
  }

  refreshPage() {
    localStorage.setItem("idSorteo", '');
    window.location.reload();
    //this._document.defaultView.location.reload();
  }

  rifaChange(event: any) {
    this.selectedRifa = event.value;
    //console.log("SEXO SELECCIONADO: " +this.selectedSexo);
  }

  getSorteo(idSorteo: number) {
    this._sorteoService.getSorteoById(idSorteo).subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      } else {
        console.log("SORTEO encontrado");
        console.log(response.data);
        this.model = response.data;
        var fecha = response.data.fecha_sorteo.date == 'null' ? new Date() : new Date(response.data.fecha_sorteo.date);
        this.model.fecha_sorteo = fecha;

        if (this.model.fecha_sorteo < this.today) {
          this.fecha_valida = true;
        }

        // Multiplico por 100 el porcentaje de sorteo traido de BD
        this.model.porcentaje_comision = response.data.porcentaje_comision * 100;

        var rifa = '';
        rifa = response.data.rifa_id.toString();
        console.log("RIFA encontrada");
        console.log(rifa);
        if (rifa != '') {

          this.rifa_1 = {
            id: Number(rifa),
            nombre: '',
            descripcion: '',
            fecha_inicio: this.today,
            fecha_fin: this.today,
            organizador: this.organizador_1,
          };
          // this.selectedRifa = this.rifa_1;

        }
      }
    });

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
    //console.log("Guardar Sorteo");
    this.model.rifa = this.selectedRifa;

    let ini = this.model.numero_inicial_talon;
    let fin = this.model.numero_final_talon;

    if (ini != undefined && fin != undefined) {
      if (ini > fin) {
        //alert("Error: ");
        let msg = "El valor inicial es Mayor!!!";
        this.mensaje_error = true;
        this.showErrorMessage(msg);
        this.showError(msg);
        return;
      }
    }

    if (this.form.valid) {
      //console.log(this.form.value);
      this._sorteoService.crearSorteo(this.model)
        .subscribe((response: any) => {
          if (response.status == 'success') {
            this.showSuccessMessage();
            this.refreshPage();
            //  console.log("Respuesta GUARDAR SORTEO");
            //   console.log(response.data);
          }
          if (response.status == 'error') {
            this.mensaje_error = true;
            this.showErrorMessage(response.message);
            this.showError(response.message);
          }
        }, error => {
          //console.error('Error al guardar el Sorteo:', error);
          this.showErrorMessage("Error en la peticion");
        });

    } else {
      console.log("Datos INVALIDOS");
    }
  }

  editar(event: any) {
    console.log("EDITAR SORTEO");
    console.log(this.model);
    let ini = this.model.numero_inicial_talon;
    let fin = this.model.numero_final_talon;

    if (ini != undefined && fin != undefined) {
      if (ini > fin) {
        //alert("Error: ");
        let msg = "El valor inicial es Mayor!!!";
        this.mensaje_error = true;
        this.showErrorMessage(msg);
        this.showError(msg);
        return;
      }
    }

    this._sorteoService.editarSorteo(this.model)
      .subscribe((response: any) => {
        if (response.status == 'success') {
          this.showSuccessMessage();
          this.refreshPage();
          //console.log("Respuesta EDITAR PERSONA");
          //console.log(response.data);
        } else {
          this.showErrorMessage(response.message);
        }
      }, error => {
        console.error('Error EDITAR Sorteo:', error);
        this.showErrorMessage(error.error.message);
      });
  }

  showErrorMessage(mensaje: string) {
    this.snackBar.open('Error: ' + mensaje, 'Cerrar', {
      duration: 2000,
    });
  }

  showError(message: string) {
    // Si el error es que ya existe ese id de empleado, mostrar el mensaje apropiado
    // Una forma es manejar códigos de error  
    this.error = 'Error: ' + message;
  }

  showSuccessMessage() {
    this.snackBar.open('Se guardo con éxito', 'Cerrar', {
      duration: 2000,
    });
  }

}
