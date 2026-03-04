import { Component, ElementRef, Input, ViewChild, inject, Output, EventEmitter } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DepositosService } from 'src/app/services/depositos.service';
import { DepositosListPasajeroComponent } from '../depositos-list-pasajero/depositos-list-pasajero.component';

@Component({
  selector: 'app-depositos-chips',
  templateUrl: './depositos-chips.component.html',
  styleUrls: ['./depositos-chips.component.scss']
})
export class DepositosChipsComponent {

  @ViewChild(DepositosListPasajeroComponent) hijo!: DepositosListPasajeroComponent;
  evento: any = [{id:'', accion: '' }];
  message: string = "Hola Mundo!";
  @Output() messageEvent: EventEmitter<any> = new EventEmitter();

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  //list: any[] = [{ id: 1, name: 'Lemon' }];
  //fruits: Fruit[] = [];
  list: any[] = [];
  totales = 0;
  //announcer = inject(LiveAnnouncer);
  constructor(private _depositosService: DepositosService) { }

  ngOnInit(): void {
    console.log("Lista chips inicializada");
    console.log(this.list);
  }

  sendMessage() {
    //this.message = 'Toma PAPA!!'
    //this.evento.accion = "refrescar"
    this.messageEvent.emit(this.evento);
  }

  remove(deposito: any): void {
    //alert("Borro chip: " + deposito.id);
    const index = this.list.indexOf(deposito);
    if (index >= 0) {
      this.list.splice(index, 1);
      //localStorage.setItem("listaDocumentos", JSON.stringify(this.list));
      this.totales -= deposito.saldo;

      this.evento.id = deposito.id;
      this.evento.accion = 'remover';
      this.sendMessage();
    }
  }

  selected: string;

  changeSelected(documento: any) {
    // Cargo el documento seleccionado
    // Avisar a componente PADRE
    console.log(documento);
    this.selected = documento.name;

    console.log("Avisar a Padre");
    // Avisar a componente PADRE
    this.evento.documento = documento.name;
    this.evento.accion = 'seleccionar';
    this.sendMessage();

  }

  guardar(obj: any): Boolean {
    console.log("Dentro de guardar chips");
    console.log('valor guardar: ' + obj.id);
    let list_aux: any[] = [];
    let contador = 0;
    //console.log("Array FRUTAS");
    //console.log("Tamano de array: " + this.list.length);
    if (this.list.length == 0) {
      let itemGrupo = {
        id: obj.id,
        idPasajero: obj.idPasajero,
        name: obj.id,
        saldo: obj.saldo,
        fecha: obj.fecha.date
      }
      list_aux.push(itemGrupo);
      this.list.push(itemGrupo);
      console.log('Item agregado a chips');
      console.log(this.list);

      this.totales += itemGrupo.saldo;
      return true;

    } else {
      var encontrado = false;
      for (let item of this.list) {
        //console.log("Valor Item: " + item.name + " Index: " + item.id);
        if (item.id === obj.id) {
          //console.log("Ya esta el item");
          alert("Ya esta agregado " + item?.id);
          encontrado = true;
        }
      }

      if (encontrado == false) {
        let itemGrupo = {
          id: obj.id,
          idPasajero: obj.idPasajero,
          name: obj.id,
          saldo: obj.saldo,
          fecha: obj.fecha.date
        }
        list_aux.push(itemGrupo);
        this.list.push(itemGrupo);
        this.totales += itemGrupo.saldo;

        return true;
      } else {
        //Ya esta agregado
        return false;
      }

    }
    // return false;
  }

  juntar() {
    if (this.list.length > 1) {
      //Unir los depositos seleccionados
      /* for (let item of this.list) {
         alert("Juntar deposito id: " + item?.id);
       }*/

      // Inicializar chips
      /* this.list = [];
       this.totales = 0;
       // Refrescar listado de depositos
       this.sendMessage();*/

      this._depositosService
        .juntarDepositos(this.list)
        .subscribe((res: any) => {
          if (res.status == 'success') {
            //this.depositoId = res.data;
            //console.log("Id deposito creado: " + res.data);
            // Inicializar chips
            this.list = [];
            this.totales = 0;
            // Refrescar listado de depositos
            this.evento.accion = 'juntar';
            this.sendMessage();
          }
        });

    } else {
      alert("Debes seleccionar mas de un deposito");
    }

  }

}
