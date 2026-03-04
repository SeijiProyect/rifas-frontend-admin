import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  // CONFIG

  // Config dTyT
  private configName = 'dtyt';
  private talonType = 'multi';
  private logoRifasUrl = '/assets/imgs/logo.svg';
  private cantidadTalones = 5;
  private tokenName = 'token-admin-dtyt';
  private showEntregarRifas = true;
  private tokenPublico = 'token-free';
  // END Config dTyT

  // Config CCEE
  // private configName = 'ccee';  
  // private talonType = 'single';
  // private cantidadTalones = 1;
  // private logoRifasUrl = '/assets/imgs/logo-ccee.svg';
  // private tokenName = 'token-admin-ccee';
  // private showEntregarRifas = true;
  // END Config dTyT

  // END CONFIG

  constructor() {}

  getTalonType(): string {
    return this.talonType;
  }
  
  getShowEntregarRifas(): boolean {
    return this.showEntregarRifas;
  }

  getTokenPublico(): string {
    return this.tokenPublico;
  }

  getTokenName(): string {
    return this.tokenName;
  }

  get isDtyt(): boolean {
    return this.configName == 'dtyt';
  }

  get isCcee(): boolean {
    return this.configName == 'ccee';
  }

  get multi(): boolean {
    return this.talonType == 'multi';
  }

  get single(): boolean {
    return this.talonType == 'single';
  }

  get showAsumirRecargo(): boolean {
    return this.showAsumirRecargo;
  }

  getCantidadTalones(): number {
    return this.cantidadTalones;
  }

  getLogoRifasUrl() {
    return this.logoRifasUrl;
  }

  passwordStrength(txt = '') {
    if (/^(?=.*[A-Z])(?=.*[!@#$&*.])(?=.*[0-9])(?=.*[a-z]).{8,}$/.test(txt)) {
      return true;
    }
    return false;
  }

  validateEmail(mail = '') {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  
}
