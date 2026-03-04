import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RifasEntregaComponent } from './rifas-entrega.component';

describe('RifasEntregaComponent', () => {
  let component: RifasEntregaComponent;
  let fixture: ComponentFixture<RifasEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RifasEntregaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RifasEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
