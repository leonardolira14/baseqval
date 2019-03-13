import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CgraficasComponent } from './cgraficas.component';

describe('CgraficasComponent', () => {
  let component: CgraficasComponent;
  let fixture: ComponentFixture<CgraficasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CgraficasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CgraficasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
