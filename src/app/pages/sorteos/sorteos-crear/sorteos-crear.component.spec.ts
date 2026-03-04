import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SorteosCrearComponent } from './sorteos-crear.component';

describe('SorteosCrearComponent', () => {
  let component: SorteosCrearComponent;
  let fixture: ComponentFixture<SorteosCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SorteosCrearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SorteosCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
