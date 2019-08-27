import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosplusComponent } from './usuariosplus.component';

describe('UsuariosplusComponent', () => {
  let component: UsuariosplusComponent;
  let fixture: ComponentFixture<UsuariosplusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosplusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosplusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
