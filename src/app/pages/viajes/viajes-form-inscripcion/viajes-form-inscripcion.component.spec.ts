import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajesFormInscripcionComponent } from './viajes-form-inscripcion.component';

describe('ViajesFormInscripcionComponent', () => {
  let component: ViajesFormInscripcionComponent;
  let fixture: ComponentFixture<ViajesFormInscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViajesFormInscripcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViajesFormInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
