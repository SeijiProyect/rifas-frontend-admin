import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCambioItinerarioComponent } from './dialog-cambio-itinerario.component';

describe('DialogCambioItinerarioComponent', () => {
  let component: DialogCambioItinerarioComponent;
  let fixture: ComponentFixture<DialogCambioItinerarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCambioItinerarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCambioItinerarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
