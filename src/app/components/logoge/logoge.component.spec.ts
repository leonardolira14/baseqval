import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogogeComponent } from './logoge.component';

describe('LogogeComponent', () => {
  let component: LogogeComponent;
  let fixture: ComponentFixture<LogogeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogogeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
