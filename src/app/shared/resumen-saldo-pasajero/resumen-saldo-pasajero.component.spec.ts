import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenSaldoPasajeroComponent } from './resumen-saldo-pasajero.component';

describe('ResumenSaldoPasajeroComponent', () => {
  let component: ResumenSaldoPasajeroComponent;
  let fixture: ComponentFixture<ResumenSaldoPasajeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenSaldoPasajeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenSaldoPasajeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
