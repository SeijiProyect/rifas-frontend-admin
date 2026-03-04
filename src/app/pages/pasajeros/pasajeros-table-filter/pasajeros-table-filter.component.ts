import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Pasajero } from 'src/app/models/pasajero.model';

const ELEMENT_DATA: Pasajero[] = [];

@Component({
  selector: 'app-pasajeros-table-filter',
  templateUrl: './pasajeros-table-filter.component.html',
  styleUrls: ['./pasajeros-table-filter.component.scss']
})
export class PasajerosTableFilterComponent implements OnInit {

  displayedColumns: string[] = ['select', 'id', 'nombre', 'apellido', 'itinerario'];
  dataSource = new MatTableDataSource<Pasajero>(ELEMENT_DATA);
  selection = new SelectionModel<Pasajero>(true, []);

  constructor() { }

  ngOnInit(): void {
    let arrayPasajeros = JSON.parse(localStorage.getItem('listaPasajeros')!);
    //console.log("Valor de LocalStronge (array): " + arrayPasajeros);
    this.dataSource = new MatTableDataSource<Pasajero>(arrayPasajeros);

  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Pasajero): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

}
