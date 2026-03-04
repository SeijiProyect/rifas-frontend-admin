import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCostoDialogComponent } from './agregar-costo-dialog.component';

describe('AgregarCostoDialogComponent', () => {
  let component: AgregarCostoDialogComponent;
  let fixture: ComponentFixture<AgregarCostoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarCostoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarCostoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
