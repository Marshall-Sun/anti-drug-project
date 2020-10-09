import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTopicCourseTableComponent } from './admin-topic-course-table.component';

describe('AdminTopicCourseTableComponent', () => {
  let component: AdminTopicCourseTableComponent;
  let fixture: ComponentFixture<AdminTopicCourseTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTopicCourseTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTopicCourseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
