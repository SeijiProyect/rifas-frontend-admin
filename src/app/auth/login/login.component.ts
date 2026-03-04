import { Component, OnInit, ViewChild } from '@angular/core';
import { Router }      from '@angular/router';
import { ActionsService } from '../../services/actions.service';
import { UserService }         from "../../services/user.service";
import { NgForm } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { GlobalService } from '../../common/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') form: NgForm | undefined;

  public ret: any;

  message: string = '';
  mailTxt: string = '';
  passTxt: string = '';
  repassTxt: string = '';
  loading: boolean = false;
  forgot: boolean = false;

  newUser = false;

  public forgetPassMail: string | undefined;
  public showForgetPassword: any;
  public showLoginMsg: any;
  public forgetPasswordSent: any;
  public working: boolean | undefined;
  public forgetPasswordSuccess = false;

  constructor(
    public actionsService: ActionsService,
    private userService: UserService,
    public router: Router,
    private apiService: ApiService,
    public globalService: GlobalService
  ) {}

  async ngOnInit(): Promise<void> {
    this.loading = true;
    await this.actionsService.getLoadingStatus().subscribe((item) => {
      this.loading = item;
    });
    
    this.forgot = false;
    this.forgetPassMail = '';
    this.working = false;
    
    await this.apiService.tokenValidation().subscribe((resp: any) => {
      
      if (resp) {
        this.router.navigate(['/dashboard']);
      }
      this.loading = false;

    });
  }

  async login(pHash = false) {
    this.newUser = false;

    let loginData = {
      email: this.mailTxt.trim().toLowerCase(),
      password: this.passTxt,
      getHash: pHash,
      type: 'student-rifas',
    };

    this.actionsService.setLoadingStatus(true);

    await this.userService.login(loginData).subscribe((resp: any) => {
      this.actionsService.setLoadingStatus(false);
      
      if (resp.newUser) {
        this.newUser = true;
        this.passTxt = '';
      } else {
        this.newUser = false;
      }
      
      if (resp.status == 'success' && !this.newUser) {
        console.log("TOKEN login:")
        console.log(resp.token);
        localStorage.setItem(this.globalService.getTokenName(), resp.token);
        this.router.navigate(['/dashboard']);
      } else {
        this.message = resp.message;
      }
    });
  }

  triggerSubmit() {
    this.message = '';
    if (this.mailTxt != '' && this.passTxt != '') {
      this.form?.ngSubmit.emit();
    } else {
      this.message = 'Debes completar todos los campos';
    }
  }

  triggerFirstSubmit() {
    this.message = '';
    this.loading = true;
    if (this.passTxt === '' || this.repassTxt === '') {
      this.message = 'Debes completar todos los campos';
      this.loading = false;
      return;
    } else if (this.passTxt !== this.repassTxt) {
      this.message = 'Las contraseñas no son iguales';
      this.loading = false;
      return;
    } else if (!this.globalService.passwordStrength(this.passTxt)) {
      this.message =
        'La contraseña debe tener al menos una mayúscula, una minúscula, un carácter especial (!@#$&*.) y un mínimo de 8 caracteres';
      this.loading = false;
    } else if (
      this.passTxt === this.repassTxt &&
      this.globalService.validateEmail(this.mailTxt)
    ) {
      this.userService.firstLogin(this.mailTxt, this.passTxt).subscribe(
        (response: any) => {
          const status = response.status;

          if (status != 'success') {
            this.message = response.data;
          } else {
            this.newUser = false;
            this.login();
          }
          this.loading = false;
        },
        (error: any) => {
          this.message =
            'Hubo un error al procesar su solicitud. Por favor intente nuevamente más tarde';
          this.loading = false;
        }
      );
    }
  }

  logout() {
    this.userService.logout();
  }

  onSubmit() {
    this.login();
  }

  showForgot() {
    this.forgot = true;
  }

  showLogin() {
    this.forgot = false;
    this.message = '';
  }

  forgotPassword() {
    this.loading = true;
    this.message = '';

    if (this.forgetPassMail != '' && this.globalService.validateEmail(this.forgetPassMail)) {
      this.userService.forgetPassword(this.forgetPassMail).subscribe(
        (response: any) => {
          const status = response.status;

          if (status != 'success') {
            this.forgetPasswordSuccess = false;
            this.message = response.message;
          } else {
            this.forgetPasswordSuccess = true;
            this.message = response.message;
          }

          this.loading = false;
        },
        (error: any) => {
          this.forgetPasswordSuccess = false;
          this.message =
            'Hubo un error al procesar su solicitud. Por favor intente nuevamente más tarde';
          this.loading = false;
        }
      );
    } else {
      this.loading = false;
      this.message = 'Ingresa tu mail';
    }
  }
}
