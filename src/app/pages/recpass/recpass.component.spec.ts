import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecpassComponent } from './recpass.component';

describe('RecpassComponent', () => {
  let component: RecpassComponent;
  let fixture: ComponentFixture<RecpassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecpassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
