import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HacerComponent } from './hacer.component';

describe('HacerComponent', () => {
  let component: HacerComponent;
  let fixture: ComponentFixture<HacerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HacerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HacerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
