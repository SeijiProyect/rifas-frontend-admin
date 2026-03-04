import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../../../common/global.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatSort, Sort } from '@angular/material/sort';
import { PersonaService } from '../../../services/persona.service';
import { MatPaginator } from '@angular/material/paginator';

import { Persona } from 'src/app/models/persona.model';
import { MatTable } from '@angular/material/table';

const ELEMENT_DATA: Persona[] = [];

@Component({
  selector: 'personas-list',
  templateUrl: './personas-list.component.html',
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

export class PersonasListComponent implements OnInit {

  today: Date = new Date();

  public personaIni: Persona = {
    id: 0, nombres: '', apellidos: '', cedula: '', celular: '', direccion: '', fecha_nac: this.today, sexo: '', email: ""
  };

  public personaselect: Persona = this.personaIni;
  public persona: Persona;
  personaList: Persona[] = [];
  public personas: any;

  public pasajero: any;
  public loading: boolean = false;
  public totalPersonas: number = 0;
  public pageIndex = 0;
  public selectedSexo = 'todos';
  public desdeValue: any = 0;
  public hastaValue: any = 0;
  public termino: string = '';
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) tabla1!: MatTable<Persona>;

  columnas: string[] = ['Id', 'Cedula', 'Nombre', 'Apellido', 'Celular', 'Email', 'btnVer'];
  dataSource = ELEMENT_DATA;

  /*p1: Persona = {
    id: 1, nombres: 'primer Nom', apellidos: 'apellido', cedula: '123', celular: '0999',
    direccion: 'jose belloni', fecha_nac: this.today, sexo: 'm', email: "per1@"
  };

  p2: Persona = {
    id: 2, nombres: 'primer Nom2', apellidos: 'apellido', cedula: '123', celular: '0999',
    direccion: 'jose belloni', fecha_nac: this.today, sexo: 'm', email: "per1@"
  };

  p3: Persona = {
    id: 3, nombres: 'primer Nom3', apellidos: 'apellido', cedula: '123', celular: '0999',
    direccion: 'jose belloni', fecha_nac: this.today, sexo: 'm', email: "per1@"
  };

  datos: Persona[] = [this.p1, this.p2, this.p3];
  articuloselect: Persona = {
    id: 2, nombres: 'primer Nom2', apellidos: 'apellido', cedula: '123', celular: '0999',
    direccion: 'jose belloni', fecha_nac: this.today, sexo: 'm', email: "per1@"
  };*/

  //datos:this.personas;

  constructor(
    private _personasService: PersonaService,
    public globalService: GlobalService,
    public router: Router
  ) {
    this.persona = {
      id: 1, nombres: 'primer Nom', apellidos: 'apellido', cedula: '123', celular: '0999',
      direccion: 'jose belloni', fecha_nac: this.today, sexo: 'm', email: "per1@"
    }
  }

  async ngOnInit() {
    await this.getPersonas();
    this.loading = true;
  }

  announceSortChange(event: any) {
  }

  getPersonas() {
    this.loading = true;
    let hastaAux = this.hastaValue;

    if (this.hastaValue) {
      let re = '00:00:00';
      hastaAux = this.hastaValue.format().replace(re, '23:59:00');
    }

    this._personasService
      .getPersonasList(
        this.pageIndex
      )
      .subscribe((response: any) => {
        let status = response.status;

        if (status != 'success') {
          status = 'error';
        }

        if (status == 'success') {
          this.personaList = [];
          this.personas = response.data.personas;
          this.totalPersonas = response.data.totalPersonas;
          let list = response.data.personas;
          let limit = 20;

          for (let i = 0; i < limit; i++) {
            // console.log("Block statement execution no." + i);
            if (list[i] != null) {
              this.persona = {
                id: list[i]['PerId'],
                nombres: list[i]['Nombres'],
                apellidos: list[i]['Apellidos'],
                cedula: list[i]['Cedula'],
                celular: list[i]['Celular'],
                email: list[i]['email']
              }
              //console.log("Persona: " + list[i]['PerId']);
              this.personaList.push(this.persona);
            }

          }

          this.dataSource = this.personaList;
          this.totalPersonas = response.data.totalPersonas;
        }
        this.loading = false;
      });
  }

  getPersonasByFilter() {
    this.loading = true;
    let hastaAux = this.hastaValue;

    if (this.hastaValue) {
      let re = '00:00:00';
      hastaAux = this.hastaValue.format().replace(re, '23:59:00');
    }

    this._personasService
      .getPersonasByFilter(
        this.pageIndex,
        this.termino,
        this.selectedSexo,
        this.desdeValue,
        this.hastaValue
      )
      .subscribe((response: any) => {
        let status = response.status;

        if (status != 'success') {
          status = 'error';
        }

        if (status == 'success') {
          this.personaList = [];
          this.personas = response.data.personas;
          this.totalPersonas = response.data.totalPersonas;
          let list = response.data.personas;
          let limit = 20;

          for (let i = 0; i < limit; i++) {
            // console.log("Block statement execution no." + i);
            if (list[i] != null) {
              this.persona = {
                id: list[i]['PerId'],
                nombres: list[i]['Nombres'],
                apellidos: list[i]['Apellidos'],
                cedula: list[i]['Cedula'],
                celular: list[i]['Celular'],
                email: list[i]['email']
              }
              //console.log("Persona: " + list[i]['PerId']);
              this.personaList.push(this.persona);
            }

          }

          this.dataSource = this.personaList;
          this.totalPersonas = response.data.totalPersonas;
        }
        this.loading = false;
      });
  }

  getPersonasByTermino() {
    this.loading = true;
    let hastaAux = this.hastaValue;

    if (this.hastaValue) {
      let re = '00:00:00';
      hastaAux = this.hastaValue.format().replace(re, '23:59:00');
    }

    this._personasService
      .getPersonasByTermino(
        this.pageIndex,
        this.termino,
        this.selectedSexo,
        this.desdeValue,
        this.hastaValue
      )
      .subscribe((response: any) => {
        let status = response.status;

        if (status != 'success') {
          status = 'error';
        }

        if (status == 'success') {
          this.personaList = [];
          this.personas = response.data.personas;
          this.totalPersonas = response.data.totalPersonas;
          let list = response.data.personas;
          let limit = 20;

          for (let i = 0; i < limit; i++) {
            // console.log("Block statement execution no." + i);
            if (list[i] != null) {
              this.persona = {
                id: list[i]['PerId'],
                nombres: list[i]['Nombres'],
                apellidos: list[i]['Apellidos'],
                cedula: list[i]['Cedula'],
                celular: list[i]['Celular'],
                email: list[i]['email']
              }
              //console.log("Persona: " + list[i]['PerId']);
              this.personaList.push(this.persona);
            }

          }

          this.dataSource = this.personaList;
          this.totalPersonas = response.data.totalPersonas;
        }
        this.loading = false;
      });
  }

  getPersonasBySexo() {
    this.loading = true;
    let hastaAux = this.hastaValue;

    if (this.hastaValue) {
      let re = '00:00:00';
      hastaAux = this.hastaValue.format().replace(re, '23:59:00');
    }

    this._personasService
      .getPersonasBySexo(
        this.pageIndex,
        this.termino,
        this.selectedSexo,
        this.desdeValue,
        this.hastaValue
      )
      .subscribe((response: any) => {
        let status = response.status;

        if (status != 'success') {
          status = 'error';
        }

        if (status == 'success') {
          this.personaList = [];
          this.personas = response.data.personas;
          this.totalPersonas = response.data.totalPersonas;
          let list = response.data.personas;
          let limit = 20;

          for (let i = 0; i < limit; i++) {
            // console.log("Block statement execution no." + i);
            if (list[i] != null) {
              this.persona = {
                id: list[i]['PerId'],
                nombres: list[i]['Nombres'],
                apellidos: list[i]['Apellidos'],
                cedula: list[i]['Cedula'],
                celular: list[i]['Celular'],
                email: list[i]['email']
              }
              //console.log("Persona: " + list[i]['PerId']);
              this.personaList.push(this.persona);
            }

          }

          this.dataSource = this.personaList;
          this.totalPersonas = response.data.totalPersonas;
        }
        this.loading = false;
      });
  }

  getPersonasByFechas() {
    this.loading = true;
    let hastaAux = this.hastaValue;

    if (this.hastaValue) {
      let re = '00:00:00';
      hastaAux = this.hastaValue.format().replace(re, '23:59:00');
    }

    this._personasService
      .getPersonasByFechas(
        this.pageIndex,
        this.termino,
        this.selectedSexo,
        this.desdeValue,
        this.hastaValue
      )
      .subscribe((response: any) => {
        let status = response.status;

        if (status != 'success') {
          status = 'error';
        }

        if (status == 'success') {
          this.personaList = [];
          this.personas = response.data.personas;
          this.totalPersonas = response.data.totalPersonas;
          let list = response.data.personas;
          let limit = 20;

          for (let i = 0; i < limit; i++) {
            // console.log("Block statement execution no." + i);
            if (list[i] != null) {
              this.persona = {
                id: list[i]['PerId'],
                nombres: list[i]['Nombres'],
                apellidos: list[i]['Apellidos'],
                cedula: list[i]['Cedula'],
                celular: list[i]['Celular'],
                email: list[i]['email']
              }
              //console.log("Persona: " + list[i]['PerId']);
              this.personaList.push(this.persona);
            }

          }

          this.dataSource = this.personaList;
          this.totalPersonas = response.data.totalPersonas;
        }
        this.loading = false;
      });
  }

  getPersonasByFechasAndSexo() {
    this.loading = true;
    let hastaAux = this.hastaValue;

    if (this.hastaValue) {
      let re = '00:00:00';
      hastaAux = this.hastaValue.format().replace(re, '23:59:00');
    }

    this._personasService
      .getPersonasByFechasAndSexo(
        this.pageIndex,
        this.termino,
        this.selectedSexo,
        this.desdeValue,
        this.hastaValue
      )
      .subscribe((response: any) => {
        let status = response.status;

        if (status != 'success') {
          status = 'error';
        }

        if (status == 'success') {
          this.personaList = [];
          this.personas = response.data.personas;
          this.totalPersonas = response.data.totalPersonas;
          let list = response.data.personas;
          let limit = 20;

          for (let i = 0; i < limit; i++) {
            // console.log("Block statement execution no." + i);
            if (list[i] != null) {
              this.persona = {
                id: list[i]['PerId'],
                nombres: list[i]['Nombres'],
                apellidos: list[i]['Apellidos'],
                cedula: list[i]['Cedula'],
                celular: list[i]['Celular'],
                email: list[i]['email']
              }
              //console.log("Persona: " + list[i]['PerId']);
              this.personaList.push(this.persona);
            }

          }

          this.dataSource = this.personaList;
          this.totalPersonas = response.data.totalPersonas;
        }
        this.loading = false;
      });
  }

  pageEvent(page: any) {
 //console.log("VALOR INDEX PAGE EN PERSONAS: " + this.pageIndex);
    this.pageIndex = page.pageIndex;

    if (this.termino == '' && this.selectedSexo == 'todos' && this.desdeValue == 0) {
      // Sin condiciones de filtro
      this.getPersonas();

    } else {

      if (this.termino != '' && this.selectedSexo != 'todos' && this.desdeValue != 0) {
        // Contiene las tres condiciones de filtro
        this.getPersonasByFilter();

      } else {

        if (this.termino != '') {
          // Contiene solo el termino
          this.getPersonasByTermino();
        }

        if (this.selectedSexo != 'todos') {
          // Contiene solo el Sexo
          this.getPersonasBySexo();
          //console.log("Filtro por SEXO");
        }

        if (this.desdeValue != 0) {
          // Contiene solo el rango de edad
          this.getPersonasByFechas();
        }

      }

    }
  }

  sexoChange(event: any) {
    this.selectedSexo = event.value;
  }

  filter() {
    this.pageIndex = 0;
    this.paginator.firstPage();
    //console.log("Termino: " + this.termino + " Sexo: " + this.selectedSexo + " desde: " + this.desdeValue + " hasta: " + this.hastaValue);
    this.pageIndex = 0;
    if (this.termino == '' && this.selectedSexo == 'todos' && this.desdeValue == 0) {
      // Sin condiciones de filtro
      this.getPersonas();

    } else {

      if (this.termino != '' && this.selectedSexo != 'todos' && this.desdeValue != 0) {
        // Contiene las tres condiciones de filtro
        this.getPersonasByFilter();

      } else {

        if (this.selectedSexo != 'todos' && this.desdeValue != 0) {
          // filtro por sexo y edad
          this.getPersonasByFechasAndSexo();
        } else {
          if (this.selectedSexo != 'todos') {
            // Contiene solo el Sexo
            this.getPersonasBySexo();
            //console.log("Filtro por SEXO");
          }

          if (this.desdeValue != 0) {
            // Contiene solo el rango de edad
            this.getPersonasByFechas();
          }

        }

        if (this.termino != '') {
          // Contiene solo el termino
          this.getPersonasByTermino();
        }

      }

    }
  }

 /* borrarFila(cod: number) {
    if (confirm("Realmente quiere borrarlo?")) {
      this.datos.splice(cod, 1);
      this.tabla1.renderRows();
    }
  }*/

  Acceder(obj: Persona) {
    //console.log("Persona seleccionada: " + obj);
    localStorage.setItem("idPersona", obj.id.toString());
    let id = localStorage.getItem("idPersona");
    this.router.navigate(["/dashboard/personas/persona-tab"]);
    console.log("obj:");
    console.log(obj);
  }
  /*agregar() {
    this.personaselect = {
      id: this.personaselect.id,
      nombres: this.personaselect.nombres,
      apellidos: this.personaselect.apellidos,
      cedula: this.personaselect.cedula,
      celular: this.personaselect.celular,
      direccion: this.personaselect.direccion,
      fecha_nac: this.today,
      sexo: this.personaselect.sexo,
      email: this.personaselect.email,
    };

    this.datos.push(this.personaselect);
    this.tabla1.renderRows();
    this.personaselect = this.personaIni;
  }*/
}
