import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmUploadDialogComponent } from './confirm-upload-dialog.component';

describe('ConfirmUploadDialogComponent', () => {
  let component: ConfirmUploadDialogComponent;
  let fixture: ComponentFixture<ConfirmUploadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmUploadDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
