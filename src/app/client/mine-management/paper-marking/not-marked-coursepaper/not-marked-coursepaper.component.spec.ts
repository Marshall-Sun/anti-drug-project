import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotMarkedCoursepaperComponent } from './not-marked-coursepaper.component';

describe('NotMarkedCoursepaperComponent', () => {
  let component: NotMarkedCoursepaperComponent;
  let fixture: ComponentFixture<NotMarkedCoursepaperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotMarkedCoursepaperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotMarkedCoursepaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
