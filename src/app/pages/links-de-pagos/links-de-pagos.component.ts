import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatSort, Sort } from '@angular/material/sort';

import { MatPaginator } from '@angular/material/paginator';
import { PersonaService } from 'src/app/services/persona.service';
import { GlobalService } from 'src/app/common/global.service';
import { ItinerarioPasajero } from 'src/app/models/itinerario-pasajero.model';
import { LinksService } from 'src/app/services/links.service';



@Component({
  selector: 'app-links-de-pagos',
  templateUrl: './links-de-pagos.component.html',
  styleUrls: ['./links-de-pagos.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class LinksDePagosComponent implements OnInit {

  public links: any;

  public loading: boolean = false;
  public accionBtnPendiente: boolean = false;
  public totalLinks: number = 0;
  public pageIndex = 0;
  public selectedSatus = 'todos';
  public termino: string = '';
  public numeroRifa: number = 0;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('table', { static: true }) table: any;

  public foundTalonesNoPagos = false;

  public status = '';

  dataSource = [];
  expandedElement: any;
  columnsToDisplay = ['LinkId', 'Estado', 'Forma de Pago', 'Nro tarjeta', 'Nombre comprador', 'Nombre vendedor', 'Acciones'];
  columnsToDisplayVal = [
    { key: 'LinkId', name: 'LinkId' },
    { key: 'Estado', name: 'Estado' },
    { key: 'Forma de Pago', name: 'Forma de Pago' },
    { key: 'Nro tarjeta', name: 'Nro tarjeta' },
    { key: 'Nombre comprador', name: 'Nombre comprador' },
    { key: 'Nombre vendedor', name: 'Nombre vendedor' },
    { key: 'Acciones', name: 'Acciones' }
  ];

  constructor(
    private __linksService: LinksService,
    private _personasService: PersonaService,
    public globalService: GlobalService,
    public router: Router
  ) { }

  async ngOnInit() {
    await this.getLinks();
    this.loading = true;

  }

  getLinks() {
    //console.log('VALOR PAGE INDEX: ' + this.pageIndex);
    this.__linksService.getLinksList(
      this.pageIndex
    )
      .subscribe((response: any) => {
        this.status = response.status;

        if (this.status != 'success') {
          this.status = 'error';
        }
        this.links = response.data.linksPagoRifas;
        this.totalLinks = response.totalLinks;
        //console.log(this.links);
        this.loading = false;
      });

  }

  getLinksByTermino() {
    this.loading = true;
    // console.log('VALOR PAGE INDEX: ' + this.pageIndex);
    this.__linksService.getLinksByTermino(
      this.pageIndex,
      this.termino,
      this.selectedSatus
    )
      .subscribe((response: any) => {
        this.status = response.status;

        if (this.status != 'success') {
          this.status = 'error';
        }
        this.links = response.data.linksPagoRifas;
        this.totalLinks = response.totalLinks;
        //console.log(this.links);
        //console.log(this.selectedSatus);
        this.loading = false;
      });
  }

  getLinksByEstado() {
    this.loading = true;
    //console.log('VALOR PAGE INDEX: ' + this.pageIndex);
    this.__linksService.getLinksByEstado(
      this.pageIndex,
      this.selectedSatus
    )
      .subscribe((response: any) => {
        this.status = response.status;

        if (this.status != 'success') {
          this.status = 'error';
        }
        this.links = response.data.linksPagoRifas;
        this.totalLinks = response.totalLinks;
        // console.log(this.links);
        //console.log(this.selectedSatus);
        this.loading = false;
      });
  }

  getLinksByNumeroRifa() {
    this.loading = true;
    // console.log('VALOR PAGE INDEX: ' + this.pageIndex);
    this.__linksService.getLinksByNumeroRifa(
      this.pageIndex,
      this.numeroRifa
    )
      .subscribe((response: any) => {
        this.status = response.status;
        if (this.status != 'success') {
          this.status = 'error';
        }
        this.links = response.data.linksPagoRifas;
        this.totalLinks = response.totalLinks;
        this.loading = false;
      });
  }

  getLinksByTerminoAndEstado() {
    this.loading = true;
    this.__linksService.getLinksByTerminoAndEstado(
      this.pageIndex,
      this.termino,
      this.selectedSatus
    )
      .subscribe((response: any) => {
        this.status = response.status;

        if (this.status != 'success') {
          this.status = 'error';
        }
        this.links = response.data.linksPagoRifas;
        this.totalLinks = response.totalLinks;
        this.loading = false;
      });
  }

  getLinksTalolesPendientes() {
    this.loading = true;
    this.accionBtnPendiente = true;
    //console.log('VALOR PAGE INDEX: ' + this.pageIndex);
    this.__linksService.getLinksWithTalonesPendientes(
      this.pageIndex
    )
      .subscribe((response: any) => {
        this.status = response.status;

        if (this.status != 'success') {
          this.status = 'error';
        }
        this.links = response.data.linksPagoRifas;
        this.totalLinks = response.totalLinks;
        // console.log(this.links);
        //console.log(this.selectedSatus);
        this.loading = false;
      });
  }

  announceSortChange(event: any) {
    //console.log(event);
  }

  pageEvent(page: any) {
    this.pageIndex = page.pageIndex;
    if (this.termino == '' && this.selectedSatus == 'todos' && this.accionBtnPendiente == false) {
      // Sin condiciones de filtro
      this.getLinks();
      //console.log("Termino y Estado vacio");
    } else {

      if (this.accionBtnPendiente) {
        this.getLinksTalolesPendientes();
      }

      if (this.termino != '' && this.selectedSatus != 'todos') {
        // Contiene las dos condiciones de filtro
        this.getLinksByTerminoAndEstado();
      } else {

        if (this.termino != '') {
          // Contiene solo el termino
          this.getLinksByTermino();
        }

        if (this.selectedSatus != 'todos') {
          // Contiene solo el Estado
          this.getLinksByEstado();
        }
      }

    }

  }

  statusChange(event: any) {
    this.selectedSatus = event.value;
  }

  filter() {
    this.accionBtnPendiente = false;
    console.log("Termino: " + this.termino + " Estado: " + this.selectedSatus);
    this.pageIndex = 0;
    if (this.termino == '' && this.selectedSatus == 'todos') {
      // Sin condiciones de filtro
      //console.log("Termino y Estado vacio");
      if (this.numeroRifa != 0) {
        this.getLinksByNumeroRifa();
      } else {
        this.getLinks();
      }

    } else {

      if (this.termino != '' && this.selectedSatus != 'todos') {
        // Contiene las dos condiciones de filtro
        this.getLinksByTerminoAndEstado();
      } else {

        if (this.termino != '') {
          // Contiene solo el termino
          this.getLinksByTermino();
        }

        if (this.selectedSatus != 'todos') {
          // Contiene solo el Estado
          this.getLinksByEstado();
        }
      }

    }

  }

  navigateToAsociarDepoConLink(id: number) {
    this.router.navigate(['dashboard/asociar-depo-con-link'], { queryParams: { id: id } });
  }

  saveRow(row: any) {
    localStorage.setItem("selectedRow", JSON.stringify(row));
  }

  isAllEstadoEqualToPendienteDePago(talones: any[]): boolean {
    return talones.every(talon => talon.Estado === 'Pendiente de Pago');
  }


}



