import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RifasCrearComponent } from './rifas-crear.component';

describe('RifasCrearComponent', () => {
  let component: RifasCrearComponent;
  let fixture: ComponentFixture<RifasCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RifasCrearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RifasCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
