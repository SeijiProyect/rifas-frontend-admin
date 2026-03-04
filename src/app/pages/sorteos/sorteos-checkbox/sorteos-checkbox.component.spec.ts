import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SorteosCheckboxComponent } from './sorteos-checkbox.component';

describe('SorteosCheckboxComponent', () => {
  let component: SorteosCheckboxComponent;
  let fixture: ComponentFixture<SorteosCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SorteosCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SorteosCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
