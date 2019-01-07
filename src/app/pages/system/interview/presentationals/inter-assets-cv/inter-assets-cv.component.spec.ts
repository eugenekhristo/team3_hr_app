import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterAssetsCvComponent } from './inter-assets-cv.component';

describe('InterAssetsCvComponent', () => {
  let component: InterAssetsCvComponent;
  let fixture: ComponentFixture<InterAssetsCvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterAssetsCvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterAssetsCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
