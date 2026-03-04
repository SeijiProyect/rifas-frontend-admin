import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DineroComponent } from './dinero.component';

describe('DineroComponent', () => {
  let component: DineroComponent;
  let fixture: ComponentFixture<DineroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DineroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DineroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
