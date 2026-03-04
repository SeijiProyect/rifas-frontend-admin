import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PasajeroService } from '../../services/pasajero.service';
import { GlobalService } from '../../common/global.service';

@Component({
  selector: 'default',
  templateUrl: './default.component.html',
})
export class DefaultComponent implements OnInit {
  public persona: any;
  public pasajeroId: number | undefined;

  constructor(
    public router: Router,
    private _pasajeroService: PasajeroService,
    public globalService: GlobalService
  ) {}

  async ngOnInit() {
    await this._pasajeroService
      .getPasajeroByUser()
      .subscribe((response: any) => {
        this.persona = response.data.persona;
        this.pasajeroId = response.data.pasajeroId;
      });
  }

  navPagarRifas() {
    this.router.navigate(['/dashboard/rifas']);
  }

  navPagarContado() {
    this.router.navigate(['/dashboard/contado']);
  }

  navRegPagoPersonal() {
    this.router.navigate(['/dashboard/pago-personal']);
  }

  showAlert() {
    Swal.fire(
      'En construcción!',
      'Estamos desarrollando transferencias de talones.',
      'info'
    );
  }
}
