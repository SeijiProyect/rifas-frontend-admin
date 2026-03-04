import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasajerosTabComponent } from './pasajeros-tab.component';

describe('PasajerosTabComponent', () => {
  let component: PasajerosTabComponent;
  let fixture: ComponentFixture<PasajerosTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasajerosTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasajerosTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
