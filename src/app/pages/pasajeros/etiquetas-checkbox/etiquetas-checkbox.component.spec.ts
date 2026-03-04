import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtiquetasCheckboxComponent } from './etiquetas-checkbox.component';

describe('EtiquetasCheckboxComponent', () => {
  let component: EtiquetasCheckboxComponent;
  let fixture: ComponentFixture<EtiquetasCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtiquetasCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtiquetasCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
