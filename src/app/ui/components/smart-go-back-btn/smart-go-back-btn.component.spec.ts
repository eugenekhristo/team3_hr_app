import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartGoBackBtnComponent } from './smart-go-back-btn.component';

describe('SmartGoBackBtnComponent', () => {
  let component: SmartGoBackBtnComponent;
  let fixture: ComponentFixture<SmartGoBackBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartGoBackBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartGoBackBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
