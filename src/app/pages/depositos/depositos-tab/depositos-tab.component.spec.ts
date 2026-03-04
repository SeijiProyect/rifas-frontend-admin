import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositosTabComponent } from './depositos-tab.component';

describe('DepositosTabComponent', () => {
  let component: DepositosTabComponent;
  let fixture: ComponentFixture<DepositosTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositosTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositosTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
