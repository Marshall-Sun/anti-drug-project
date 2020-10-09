import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursepaperComponent } from './coursepaper.component';

describe('CoursepaperComponent', () => {
  let component: CoursepaperComponent;
  let fixture: ComponentFixture<CoursepaperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursepaperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursepaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
