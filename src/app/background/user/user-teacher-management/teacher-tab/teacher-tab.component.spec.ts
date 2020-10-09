import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherTabComponent } from './teacher-tab.component';

describe('TeacherTabComponent', () => {
  let component: TeacherTabComponent;
  let fixture: ComponentFixture<TeacherTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
