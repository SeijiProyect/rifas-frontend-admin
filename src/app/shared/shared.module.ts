import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';


import { ReactiveFormsModule } from '@angular/forms';

import { DatePickerComponent } from './date-picker/date-picker.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogEditarMontoComponent } from './dialog-editar-monto/dialog-editar-monto.component';
import { ConfirmUploadDialogComponent } from './confirm-upload-dialog/confirm-upload-dialog.component';
import { ResumenSaldoPasajeroComponent } from './resumen-saldo-pasajero/resumen-saldo-pasajero.component';
import { DialogCompradorComponent } from './dialog-comprador/dialog-comprador.component';
import { DialogDepositoComponent } from './dialog-deposito/dialog-deposito.component';


@NgModule({
  declarations: [DatePickerComponent, AutocompleteComponent, DialogEditarMontoComponent, ConfirmUploadDialogComponent, ResumenSaldoPasajeroComponent, DialogCompradorComponent, DialogDepositoComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatRadioModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  exports: [
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatRadioModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatTooltipModule,
    DatePickerComponent,
    AutocompleteComponent,
    MatFormFieldModule,
    MatCardModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatCheckboxModule,
    ResumenSaldoPasajeroComponent
  ],
  providers: [],
})
export class SharedModule {}
