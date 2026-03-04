import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { GlobalService } from '../../../common/global.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'change-password',
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent implements OnInit {
  public token: any;
  public loading = false;
  public passTxt = '';
  public repeatPassTxt = '';
  public message = '';
  public changePassSuccess = false;
  public redirectPage = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _userService: UserService,
    private globalService: GlobalService
  ) {}

  ngOnInit() {
    this.loading = true;

    this.route.params.subscribe((params) => {
      this.token = params['token'];

      if (isNaN(this.token) || this.token !== undefined || this.token !== '') {
        this._userService.verifyLink(this.token).subscribe((response: any) => {
          if (response.status !== 'success') {
            this.redirectPage = true;
            this.loading = false;
            let counter = 5;
            this.message = `El link expiró, intente resetar nuevamente. Serás redireccionado en ${counter}...`;
            const intervalId = setInterval(() => {
              if (counter > 0) {
                counter--;
                this.message = `El link expiró, intente resetar nuevamente. Serás redireccionado en ${counter}...`;
              } else {
                clearInterval(intervalId);
                this.router.navigate(['/login']);
              }
            }, 1000);
          }
        });
      } else {
        this.router.navigate(['/error']);
      }

      this.loading = false;
    });
  }

  triggerSubmit() {
    this.changePassSuccess = false;
    this.message = '';
    let counter = 3;

    if (this.passTxt === '' || this.repeatPassTxt === '') {
      this.message = 'Debes completar todos los campos.';
      return;
    }

    if (this.passTxt !== this.repeatPassTxt) {
      this.message = 'Las contraseñas no coinciden.';
      return;
    } else if (!this.globalService.passwordStrength(this.passTxt)) {
      this.message =
        'La contraseña debe tener al menos una mayúscula, una minúscula, un carácter especial (!@#$&*.) y un mínimo de 8 caracteres';
      this.loading = false;
      return;
    } else {
      if (this.validatePassword()) {
        this.loading = true;
        this._userService
          .resetPassword(this.token, this.passTxt)
          .subscribe((response: any) => {
            this.loading = false;
            if (response.status === 'success') {
              let counter = 10;

              this.message = `Contraseña cambiada correctamente, serás redirigido a el login en ${counter}...`;
              this.changePassSuccess = true;

              const intervalId = setInterval(() => {
                if (counter > 0) {
                  counter--;
                  this.message = `Contraseña cambiada correctamente, serás redirigido a el login en ${counter}...`;
                } else {
                  clearInterval(intervalId);
                  this.router.navigate(['/login']);
                }
              }, 1000);
            } else {
              this.message =
                response.data +
                ` Intenta resetear la contraseña nuevamente: ${counter}...`;

              const intervalId = setInterval(() => {
                if (counter > 0) {
                  counter--;
                  this.message =
                    response.data +
                    ` Intenta resetear la contraseña nuevamente: ${counter}...`;
                } else {
                  clearInterval(intervalId);
                  this.router.navigate(['/login']);
                }
              }, 1000);
            }
          });
      } else {
        this.message = `La contraseña debe contener letras mayúsculas, minúsculas, números y un mínimo de 8 caracteres`;
        return;
      }
    }

    this.loading = false;
  }

  validatePassword() {
    const hasUpperCase = /[A-Z]/.test(this.passTxt);
    const hasLowerCase = /[a-z]/.test(this.passTxt);
    const hasNumbers = /\d/.test(this.passTxt);

    if (
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      this.passTxt.length >= 8
    ) {
      return true;
    } else {
      return false;
    }
  }
}
