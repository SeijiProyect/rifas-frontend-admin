import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasajerosDialogComponent } from './pasajeros-dialog.component';

describe('PasajerosDialogComponent', () => {
  let component: PasajerosDialogComponent;
  let fixture: ComponentFixture<PasajerosDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasajerosDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasajerosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
