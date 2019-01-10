import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferredContactIconComponent } from './preferred-contact-icon.component';

describe('PreferredContactIconComponent', () => {
  let component: PreferredContactIconComponent;
  let fixture: ComponentFixture<PreferredContactIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferredContactIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferredContactIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
