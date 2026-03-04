import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItinerariosLisByViajeComponent } from './itinerarios-list-by-viaje.component';

describe('ItinerariosLisByViajeComponent', () => {
  let component: ItinerariosLisByViajeComponent;
  let fixture: ComponentFixture<ItinerariosLisByViajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItinerariosLisByViajeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItinerariosLisByViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
