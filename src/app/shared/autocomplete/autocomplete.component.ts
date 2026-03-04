import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

/**
 * @title Highlight the first autocomplete option
 */
@Component({
  selector: 'app-autocomplete',
  templateUrl: 'autocomplete.component.html',
  styleUrls: ['autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit {
  @Input() title: any;
  @Input() options: any;
  @Input() type: any = 'fill';
  @Output() result = new EventEmitter<string>();

  myControl = new FormControl();
  filteredOptions: Observable<any[]> | undefined;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: any): any[] {
    let filterValue = value;

    if (isNaN(value) ){
      console.log("Valor isNaN");
      filterValue = value.toLowerCase();
    } else {
      this.result.emit(value);
    }


    return this.options.filter((option: any) => {
      return (
        option.apellidos?.toLowerCase().includes(filterValue) ||
        option.nombres?.toLowerCase().includes(filterValue)
      );
    });
  }

  getTitle(pId: string) {
    const lOption = this.options.find((option: { pasajero_id: string }) => {
      return option.pasajero_id === pId;
    });

    return lOption ? lOption.apellidos + ', ' + lOption.nombres : '';
  }
}
