import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpreguntasComponent } from './cpreguntas.component';

describe('CpreguntasComponent', () => {
  let component: CpreguntasComponent;
  let fixture: ComponentFixture<CpreguntasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpreguntasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
