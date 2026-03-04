import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GrupoService } from 'src/app/services/grupo.service';
import { ViajeService } from 'src/app/services/viaje.service';

@Component({
  selector: 'app-grupos-list',
  templateUrl: './grupos-list.component.html',
  styleUrls: ['./grupos-list.component.scss']
})
export class GruposListComponent implements OnInit {

  // Creamos la variable a enviar al padre
  @Output() visible_grupo: EventEmitter<boolean>;
  @Output() mensaje: EventEmitter<string>;
  @Output() selectGrupo: EventEmitter<string>;

  @Input() viaje: number = 0;
  public loading: boolean = false;
  public grupos: any;
  public selectedGrupo = 'todos';
  tamanio: number = 1;
  public visible: boolean = false;

  //myControl = new FormControl();
  form: FormGroup = new FormGroup({});

  constructor(private _grupoService: GrupoService, private _viajeService: ViajeService) {
    // Inicializamos la emicion de eventos
    this.mensaje = new EventEmitter();
    this.visible_grupo = new EventEmitter();
    this.selectGrupo = new EventEmitter();
  }

  ngOnInit(): void {
    //grupo: new FormControl({ value: null, disabled: false }, [Validators.required]);
    this.buildForm();
    if (this.viaje != 0) {
      //Viaje por ID
      this.getViajeById(this.viaje);
    } else {
      //CARGO TODOS LOS GRUPOS
      this.getGrupos();
    }
  }

  private buildForm(): void {
    this.form = new FormGroup({
      grupo: new FormControl({ value: null, disabled: false }, [Validators.required]),
    });

    this.form.valueChanges
      .subscribe(value => {
        console.log(value);
      });
  }

  emitirMensaje(msj: string) {
    // Usando la variable emitimos el valor que queremos enviar
    this.mensaje.emit(msj);
  }

  emitirGrupoSelecionado(grupo: string) {
    // Usando la variable emitimos el valor que queremos enviar
    this.selectGrupo.emit(grupo);
    this.visible_grupo.emit(this.visible);
  }

  getGrupos() {
    this.loading = true;
    this._grupoService.getGrupos().subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        console.log("Grupos");
        console.log(response.data);
        this.grupos = response.data;
      }
      this.loading = false;
    });
  }

  getViajeById(id: number) {
    this.loading = true;
    this._viajeService.getViajeById(id).subscribe((response: any) => {
      let status = response.status;

      if (status == 'success') {
        console.log("VIAJE");
        console.log(response.data);
        this.emitirMensaje(response.data.nombre);
        //Grupos por ID de VIAJE
        this.getGruposByIdViaje(this.viaje);
      }
      if (status == 'error') {
        console.log("Error en buscar VIAJE");
      }
      this.loading = false;
    }, error => {
      //console.error('Error al guardar el Sorteo:', error);
      console.log("Error en buscar VIAJE");
      // Avisa al componente padre "No mostrar formulario"
      this.emitirMensaje('');

    });
  }

  getGruposByIdViaje(id: number) {
    this.loading = true;
    this._grupoService.getGruposByViaje(id).subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      }

      if (status == 'success') {
        console.log("Grupos");
        console.log(response.data);
        this.grupos = response.data;
        let grupos = response.data;
        let list: any[] = [];

        for (let grupo of grupos) {
          let itemGrupo = {
            id: grupo['id'],
            nombre: grupo['Nombre']
          }
          list.push(itemGrupo);
        }
        this.grupos = list;
        //console.log("Cantidad de elementos en GRUPO: " + this.grupos.length);
        this.tamanio = this.grupos.length;
        if (this.grupos.length == 1) {
          //console.log("Valor ID grupo:" + this.grupos[0]['id']);
          this.selectedGrupo = this.grupos[0]['id'];
          this.visible = true;
          this.emitirGrupoSelecionado(this.selectedGrupo);
        }
      }
      this.loading = false;
    });
  }

  grupoChange(event: any) {
    this.selectedGrupo = event.value;
    this.emitirGrupoSelecionado(this.selectedGrupo);
  }

}
