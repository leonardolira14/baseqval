import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CgraficaspComponent } from './cgraficasp.component';

describe('CgraficaspComponent', () => {
  let component: CgraficaspComponent;
  let fixture: ComponentFixture<CgraficaspComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CgraficaspComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CgraficaspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
