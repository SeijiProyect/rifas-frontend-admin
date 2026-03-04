import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCompradorComponent } from './dialog-comprador.component';

describe('DialogCompradorComponent', () => {
  let component: DialogCompradorComponent;
  let fixture: ComponentFixture<DialogCompradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCompradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCompradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
