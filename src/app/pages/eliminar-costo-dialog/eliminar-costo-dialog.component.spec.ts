import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarCostoDialogComponent } from './eliminar-costo-dialog.component';

describe('EliminarCostoDialogComponent', () => {
  let component: EliminarCostoDialogComponent;
  let fixture: ComponentFixture<EliminarCostoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarCostoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarCostoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
