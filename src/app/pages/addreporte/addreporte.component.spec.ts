import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddreporteComponent } from './addreporte.component';

describe('AddreporteComponent', () => {
  let component: AddreporteComponent;
  let fixture: ComponentFixture<AddreporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddreporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddreporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
