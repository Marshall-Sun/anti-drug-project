import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HaveMarkedCoursepaperComponent } from './have-marked-coursepaper.component';

describe('HaveMarkedCoursepaperComponent', () => {
  let component: HaveMarkedCoursepaperComponent;
  let fixture: ComponentFixture<HaveMarkedCoursepaperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaveMarkedCoursepaperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaveMarkedCoursepaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
