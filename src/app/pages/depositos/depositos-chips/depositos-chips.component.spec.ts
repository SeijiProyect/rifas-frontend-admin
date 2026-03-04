import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositosChipsComponent } from './depositos-chips.component';

describe('DepositosChipsComponent', () => {
  let component: DepositosChipsComponent;
  let fixture: ComponentFixture<DepositosChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositosChipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositosChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
