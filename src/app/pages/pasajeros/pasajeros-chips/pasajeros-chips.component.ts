import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Pasajero } from 'src/app/models/pasajero.model';


@Component({
  selector: 'app-pasajeros-chips',
  templateUrl: './pasajeros-chips.component.html',
  styleUrls: ['./pasajeros-chips.component.scss'],
})
export class PasajerosChipsComponent {

  @Input('pasajero') pasajeroInput!: Pasajero;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  /* filteredFruits: Observable<string[]>; */
  fruits: string[] = [];
  //allFruits: string[] = ['Jose', 'Maria', 'Ana', 'Pedro', 'Luis'];
  pasajeros: Pasajero[] = [];
  pasajeroList: Pasajero[] = [];

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;

  constructor(public router: Router) {

    /*this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      //map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );*/
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
    this.fruitCtrl.setValue(null);
  }

  remove(pasajero: Pasajero): void {
    const index = this.pasajeros.indexOf(pasajero);
    // const indexPasajero = this.pasajeroList.indexOf(fruit);
    if (index >= 0) {
      this.pasajeros.splice(index, 1);
      this.pasajeroList.splice(index, 1);
    }

  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private buscarPasajero() {

  }

  guardar(obj: Pasajero) {
    if (obj.persona) {
      this.pasajeros.push(obj);
      this.pasajeroList.push(obj);
    }
  }

  trabajar() {
    localStorage.setItem("listaPasajeros", JSON.stringify(this.pasajeroList));
    let pasajero = localStorage.getItem("listaPasajeros");
    //console.log("Valor de LocalStronge (string): " + localStorage.getItem('listaPasajeros'));

    let array = JSON.parse(localStorage.getItem('listaPasajeros')!);

    //console.log("Valor de LocalStronge (array): " + array);
    this.router.navigate(["/dashboard/pasajeros/pasajeros-tab"]);
  }

}
