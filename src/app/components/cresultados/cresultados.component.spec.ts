import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CresultadosComponent } from './cresultados.component';

describe('CresultadosComponent', () => {
  let component: CresultadosComponent;
  let fixture: ComponentFixture<CresultadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CresultadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CresultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
