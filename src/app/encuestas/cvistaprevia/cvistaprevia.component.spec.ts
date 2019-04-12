import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvistapreviaComponent } from './cvistaprevia.component';

describe('CvistapreviaComponent', () => {
  let component: CvistapreviaComponent;
  let fixture: ComponentFixture<CvistapreviaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvistapreviaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvistapreviaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
