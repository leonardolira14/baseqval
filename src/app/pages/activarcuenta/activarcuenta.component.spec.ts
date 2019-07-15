import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivarcuentaComponent } from './activarcuenta.component';

describe('ActivarcuentaComponent', () => {
  let component: ActivarcuentaComponent;
  let fixture: ComponentFixture<ActivarcuentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivarcuentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivarcuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
