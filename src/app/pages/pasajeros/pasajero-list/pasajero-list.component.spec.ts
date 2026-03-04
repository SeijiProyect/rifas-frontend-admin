import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasajeroListComponent } from './pasajero-list.component';

describe('PasajeroListComponent', () => {
  let component: PasajeroListComponent;
  let fixture: ComponentFixture<PasajeroListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasajeroListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasajeroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
