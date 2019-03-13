import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CgruposComponent } from './cgrupos.component';

describe('CgruposComponent', () => {
  let component: CgruposComponent;
  let fixture: ComponentFixture<CgruposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CgruposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CgruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
