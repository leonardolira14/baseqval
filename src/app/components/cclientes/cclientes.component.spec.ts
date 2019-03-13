import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CclientesComponent } from './cclientes.component';

describe('CclientesComponent', () => {
  let component: CclientesComponent;
  let fixture: ComponentFixture<CclientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CclientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CclientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
