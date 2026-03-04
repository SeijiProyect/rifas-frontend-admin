import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RifasTabComponent } from './rifas-tab.component';

describe('RifasTabComponent', () => {
  let component: RifasTabComponent;
  let fixture: ComponentFixture<RifasTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RifasTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RifasTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
