import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cregistro3Component } from './cregistro3.component';

describe('Cregistro3Component', () => {
  let component: Cregistro3Component;
  let fixture: ComponentFixture<Cregistro3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cregistro3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cregistro3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
