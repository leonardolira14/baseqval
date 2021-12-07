import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaspComponent } from './graficasp.component';

describe('GraficaspComponent', () => {
  let component: GraficaspComponent;
  let fixture: ComponentFixture<GraficaspComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficaspComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
