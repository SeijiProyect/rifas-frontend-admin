import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RifasTableComponent } from '../../rifas/rifas-table/rifas-table.component';

@Component({
  selector: 'app-rifas-tab',
  templateUrl: './rifas-tab.component.html',
  styleUrls: ['./rifas-tab.component.scss']
})
export class RifasTabComponent implements OnInit, AfterViewInit {
  @ViewChild(RifasTableComponent) child!: RifasTableComponent;
  visible_tabla_rifas = true;
  visible_form_rifa = false;
  visible_form_sorteo = false;
  visible_form_sorteo_edit = false;
  constructor() { }
  ngOnInit(): void {
    localStorage.setItem("idSorteo", '');
  }

  ngAfterViewInit() {
    // this.visible_tabla_rifas = this.child.visible;
  }

  receiveMessage($event: any) {
    console.log("Valor visible: " + $event);
    if ($event == 'pantalla_form_rifa') {
      this.visible_tabla_rifas = false;
      this.visible_form_rifa = true;
      this.visible_form_sorteo = false;
    }
    if ($event == 'pantalla_form_sorteo') {
      this.visible_form_rifa = false;
      this.visible_tabla_rifas = false;
      this.visible_form_sorteo = true;
    }

    if ($event == 'pantalla_form_sorteo_edit') {
      this.visible_form_rifa = false;
      this.visible_tabla_rifas = false;
      this.visible_form_sorteo = false;
      this.visible_form_sorteo_edit = true;
    }


  }

}
