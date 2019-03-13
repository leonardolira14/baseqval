import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintreporteComponent } from './printreporte.component';

describe('PrintreporteComponent', () => {
  let component: PrintreporteComponent;
  let fixture: ComponentFixture<PrintreporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintreporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintreporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
