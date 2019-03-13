import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaddreporteComponent } from './caddreporte.component';

describe('CaddreporteComponent', () => {
  let component: CaddreporteComponent;
  let fixture: ComponentFixture<CaddreporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaddreporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaddreporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
