import { MatChipsModule } from '@angular/material/chips';
import { Component } from '@angular/core';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
/* PRIMER SUBIDA A SERVER 15 PRUEBA DE ACTION */
export class AppComponent {
  constructor() {
    console.log("ENTORNO ACTUAL: Production = " + environment.production); // Logs false for development environment
  }
  title = 'dtyt-rifas-admin';

}
