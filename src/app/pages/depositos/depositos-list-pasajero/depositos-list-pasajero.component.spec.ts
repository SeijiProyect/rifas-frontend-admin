import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositosListPasajeroComponent } from './depositos-list-pasajero.component';

describe('DepositosListPasajeroComponent', () => {
  let component: DepositosListPasajeroComponent;
  let fixture: ComponentFixture<DepositosListPasajeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositosListPasajeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositosListPasajeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
