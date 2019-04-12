import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChacerComponent } from './chacer.component';

describe('ChacerComponent', () => {
  let component: ChacerComponent;
  let fixture: ComponentFixture<ChacerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChacerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChacerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
