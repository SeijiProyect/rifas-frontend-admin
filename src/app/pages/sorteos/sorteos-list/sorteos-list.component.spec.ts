import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SorteosListComponent } from './sorteos-list.component';

describe('SorteosListComponent', () => {
  let component: SorteosListComponent;
  let fixture: ComponentFixture<SorteosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SorteosListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SorteosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
