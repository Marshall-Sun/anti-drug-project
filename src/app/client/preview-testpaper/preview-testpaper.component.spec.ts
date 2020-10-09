import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewTestpaperComponent } from './preview-testpaper.component';

describe('PreviewTestpaperComponent', () => {
  let component: PreviewTestpaperComponent;
  let fixture: ComponentFixture<PreviewTestpaperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewTestpaperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewTestpaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
