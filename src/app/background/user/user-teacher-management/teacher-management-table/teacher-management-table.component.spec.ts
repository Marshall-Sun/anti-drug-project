import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherManagementTableComponent } from './teacher-management-table.component';

describe('TeacherManagementTableComponent', () => {
  let component: TeacherManagementTableComponent;
  let fixture: ComponentFixture<TeacherManagementTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherManagementTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherManagementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
