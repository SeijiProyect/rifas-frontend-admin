import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasajerosTableFilterComponent } from './pasajeros-table-filter.component';

describe('PasajerosTableFilterComponent', () => {
  let component: PasajerosTableFilterComponent;
  let fixture: ComponentFixture<PasajerosTableFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasajerosTableFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasajerosTableFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
