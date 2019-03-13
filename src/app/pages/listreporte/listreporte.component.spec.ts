import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListreporteComponent } from './listreporte.component';

describe('ListreporteComponent', () => {
  let component: ListreporteComponent;
  let fixture: ComponentFixture<ListreporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListreporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListreporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
