import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItinerariosListComponent } from './itinerarios-list.component';

describe('ItinerariosListComponent', () => {
  let component: ItinerariosListComponent;
  let fixture: ComponentFixture<ItinerariosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItinerariosListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItinerariosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
