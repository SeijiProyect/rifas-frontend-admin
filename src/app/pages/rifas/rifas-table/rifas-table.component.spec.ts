import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RifasTableComponent } from './rifas-table.component';

describe('RifasTableComponent', () => {
  let component: RifasTableComponent;
  let fixture: ComponentFixture<RifasTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RifasTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RifasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
