import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosgeComponent } from './datosge.component';

describe('DatosgeComponent', () => {
  let component: DatosgeComponent;
  let fixture: ComponentFixture<DatosgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
