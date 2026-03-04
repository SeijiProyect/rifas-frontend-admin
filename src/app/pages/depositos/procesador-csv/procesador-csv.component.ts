import { Component, OnInit } from '@angular/core';
import { DepositosService } from '../../../services/depositos.service';

@Component({
  selector: 'app-procesador-csv',
  templateUrl: './procesador-csv.component.html',
})
export class ProcesadorCsvComponent implements OnInit {
  public loading: boolean = false;
  public savingCsv: boolean = false;
  public uploadingCsv: boolean = false;
  public csvInput: any = '';
  public depositos: any[] = [];
  public depositosProcesados: any[] = [];
  public currentStep = 1;

  columnsToDisplay = ['fecha', 'monto', 'persona', 'tipo', 'cedula'];
  columnsToDisplayVal = [
    { key: 'fecha', name: 'Fecha' },
    { key: 'monto', name: 'Monto' },
    { key: 'persona', name: 'Persona' },
    { key: 'tipo', name: 'Tipo' },
    { key: 'cedula', name: 'Cédula' },
  ];
  columnsToDisplayResult = ['fecha', 'monto', 'persona', 'tipo', 'cedula', 'status'];
  columnsToDisplayValResult = [
    { key: 'fecha', name: 'Fecha' },
    { key: 'monto', name: 'Monto' },
    { key: 'persona', name: 'Persona' },
    { key: 'tipo', name: 'Tipo' },
    { key: 'cedula', name: 'Cédula' },
    { key: 'status', name: 'Estado' },
  ];

  constructor(private depositosService: DepositosService) {}

  ngOnInit(): void {}

  csvChangeEvent(pFileInput: any) {
    this.csvInput = pFileInput;
    this.currentStep = 2;
  }

  uploadCsv() {
    this.uploadingCsv = true;
    this.loading = true;
    let filesToUpload: Array<File>;

    filesToUpload = <Array<File>>this.csvInput.target.files;

    const formData: FormData = new FormData();

    for (let i = 0; i < filesToUpload.length; i++) {
      formData.append('csvToUpload', filesToUpload[i], filesToUpload[i].name);
    }

    this.depositosService.uploadCsv(formData).subscribe((response: any) => {
      let lStatus = response.status;
      let resultUpload;

      if (lStatus != 'success') {
        resultUpload = false;
      } else {
        this.depositos = response.data;
        this.currentStep = 3;
      }
      this.uploadingCsv = false;
      this.loading = false;
    });
  }

  triggerFileInput() {
    document.getElementById('file-input')?.click();
  }

  saveBanco() {
    this.loading = true;
    this.savingCsv = true;
    this.depositosService
      .saveDepositosCsv(this.depositos)
      .subscribe((response: any) => {
        if (response.status != 'success') {
          // resultUpload = false;
        } else {
          this.loading = false;
          this.savingCsv = false;
          this.depositos = [];
          this.depositosProcesados = response.data;
          this.csvInput = '';
          this.currentStep = 4;
        }
      });
  }
}
