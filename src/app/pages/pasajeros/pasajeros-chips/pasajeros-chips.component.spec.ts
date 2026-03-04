import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasajerosChipsComponent } from './pasajeros-chips.component';

describe('PasajerosChipsComponent', () => {
  let component: PasajerosChipsComponent;
  let fixture: ComponentFixture<PasajerosChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasajerosChipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasajerosChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
