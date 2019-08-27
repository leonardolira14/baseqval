import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CusuariosplusComponent } from './cusuariosplus.component';

describe('CusuariosplusComponent', () => {
  let component: CusuariosplusComponent;
  let fixture: ComponentFixture<CusuariosplusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CusuariosplusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CusuariosplusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
