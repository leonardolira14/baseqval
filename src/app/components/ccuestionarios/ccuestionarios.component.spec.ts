import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcuestionariosComponent } from './ccuestionarios.component';

describe('CcuestionariosComponent', () => {
  let component: CcuestionariosComponent;
  let fixture: ComponentFixture<CcuestionariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcuestionariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcuestionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
