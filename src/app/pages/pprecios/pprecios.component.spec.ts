import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PpreciosComponent } from './pprecios.component';

describe('PpreciosComponent', () => {
  let component: PpreciosComponent;
  let fixture: ComponentFixture<PpreciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PpreciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PpreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
