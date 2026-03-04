import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosListPersonaComponent } from './documentos-list-persona.component';

describe('DocumentosListPersonaComponent', () => {
  let component: DocumentosListPersonaComponent;
  let fixture: ComponentFixture<DocumentosListPersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentosListPersonaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosListPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
