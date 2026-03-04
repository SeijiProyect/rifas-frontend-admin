import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociarDepoConLinkComponent } from './asociar-depo-con-link.component';

describe('AsociarDepoConLinkComponent', () => {
  let component: AsociarDepoConLinkComponent;
  let fixture: ComponentFixture<AsociarDepoConLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsociarDepoConLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsociarDepoConLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
