import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversidadesListComponent } from './universidades-list.component';

describe('UniversidadesListComponent', () => {
  let component: UniversidadesListComponent;
  let fixture: ComponentFixture<UniversidadesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniversidadesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversidadesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
