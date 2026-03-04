import { NumberFormatStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn } from '@angular/forms';


export interface Etiqueta {
  index: number;
  id: number;
  nombre: string;
  estado: string;
  checked: boolean;
}

@Component({
  selector: 'app-etiquetas-checkbox',
  templateUrl: './etiquetas-checkbox.component.html',
  styleUrls: ['./etiquetas-checkbox.component.scss']
})

export class EtiquetasCheckboxComponent implements OnInit {

  form: FormGroup;

  public etiquetas: Etiqueta[] = [
    { index: 0, id: 0, nombre: "Banana", estado: 'A', checked: false },
    { index: 1, id: 1, nombre: "Apple", estado: 'A', checked: false },
    { index: 2, id: 2, nombre: "Guava", estado: 'A', checked: false },
    { index: 3, id: 3, nombre: "Strawberry", estado: 'A', checked: false }
  ];

  get ordersFormArray() {
    return this.form.controls.orders as FormArray;
  }

  constructor(private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      orders: new FormArray([])
    });

    this.addCheckboxesToForm();
  }

  private addCheckboxesToForm() {
    this.etiquetas.forEach(() => this.ordersFormArray.push(new FormControl(false)));
  }

  ngOnInit(): void {
  }

  asignar() {
    const selectedOrderIds = this.form.value.orders;
    console.log("casillas seleccionadas: " + selectedOrderIds);
    var i = 0;
    var banderaCheckeados = false;
    for (let item of selectedOrderIds) {
      let e1 = this.form.get(item.nombre);
      console.log("Index: " + i + " Valor: " + item);
      if (item == true) {
        banderaCheckeados = true;
        this.checkEtiqueta(i);
      }
      i++;
    }
    if (banderaCheckeados == false) {
      alert('Debes seleccionar una Etiqueta');
    }


  }

  private checkEtiqueta(index: number) {
    for (let item of this.etiquetas) {
      if (index == item.index) {
        item.checked = true;
      }
      let e1 = this.form.get(item.nombre);
      console.log("Etiqueta: " + item.nombre + " valor: " + item.checked);
    }

  }

  submit() {
    /*const selectedOrderIds = this.form.value.orders
      .map((checked, i) => checked ? this.etiquetas[i].id : null)
      .filter(v => v !== null);
    console.log(selectedOrderIds);*/
  }

}
