import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortInfoComponent } from './short-info.component';

describe('ShortInfoComponent', () => {
  let component: ShortInfoComponent;
  let fixture: ComponentFixture<ShortInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
