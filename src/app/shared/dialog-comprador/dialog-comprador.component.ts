import { Component, OnInit, Inject } from '@angular/core';
import { Comprador } from 'src/app/models/comprador.model';
import { CompradorService } from '../../services/comprador.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-dialog-comprador',
  templateUrl: './dialog-comprador.component.html',
  styleUrls: ['./dialog-comprador.component.scss']
})
export class DialogCompradorComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  public idComprador = '';
  model: Comprador = {
    id: 0,
    nombres: '',
    email: '',
    celular: '',
    departamento: '',
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private _compradorService: CompradorService,) { }

  ngOnInit(): void {
    let id = localStorage.getItem("idComprador");
    if (id != null) {
      this.idComprador = id;
      this.getComprador(Number(this.idComprador));
    }
  }

  private buildForm() {
    this.form = new FormGroup({
      id: new FormControl({ value: null, disabled: true }, [Validators.required]),
      cedula: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.maxLength(8)]),
      nombre: new FormControl({ value: null, disabled: true }, [Validators.required]),
      apellido: new FormControl({ value: null, disabled: true }, [Validators.required]),
      email: new FormControl({ value: null, disabled: true }, [Validators.email]),
      direccion: new FormControl({ value: null, disabled: true }, [Validators.maxLength(200)]),
      sexo: new FormControl({ value: null, disabled: true }, [Validators.required]),
      celular: new FormControl({ value: null, disabled: true }, [Validators.required]),
      fechaNac: new FormControl({ value: null, disabled: true }, [Validators.required]),
    });

  /*  this.formDatosPersonales.valueChanges
      .subscribe(value => {
       // console.log(value);
      });*/
  }

  getComprador(idComprador: number) {
    this._compradorService.getCompradorById(idComprador).subscribe((response: any) => {
      let status = response.status;

      if (status != 'success') {
        status = 'error';
      } else {
        console.log('Comprador: ');
        console.log(response.data);
        this.model = response.data;
        /*var sexo = '';
        sexo = response.data.sexo.toString();
        if (sexo != '') {
          this.selectedSexo = response.data.sexo.toString();
        }
 
        var fechanaci = response.data.fecha_nac.date == 'null' ? new Date() : new Date(response.data.fecha_nac.date);
        this.model.fecha_nac = fechanaci;*/
      }
    });

  }

}
