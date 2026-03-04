import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajesTabComponent } from './viajes-tab.component';

describe('ViajesTabComponent', () => {
  let component: ViajesTabComponent;
  let fixture: ComponentFixture<ViajesTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViajesTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViajesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
