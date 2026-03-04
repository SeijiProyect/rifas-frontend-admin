import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDepositoComponent } from './dialog-deposito.component';

describe('DialogDepositoComponent', () => {
  let component: DialogDepositoComponent;
  let fixture: ComponentFixture<DialogDepositoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDepositoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
