import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherPromoteComponent } from './teacher-promote.component';

describe('TeacherPromoteComponent', () => {
  let component: TeacherPromoteComponent;
  let fixture: ComponentFixture<TeacherPromoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherPromoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherPromoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
