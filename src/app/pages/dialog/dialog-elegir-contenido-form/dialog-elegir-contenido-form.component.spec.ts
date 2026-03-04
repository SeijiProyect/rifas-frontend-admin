import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogElegirContenidoFormComponent } from './dialog-elegir-contenido-form.component';

describe('DialogElegirContenidoFormComponent', () => {
  let component: DialogElegirContenidoFormComponent;
  let fixture: ComponentFixture<DialogElegirContenidoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogElegirContenidoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogElegirContenidoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
