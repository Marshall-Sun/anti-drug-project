import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeworkExamComponent } from './homework-exam.component';

describe('HomeworkExamComponent', () => {
  let component: HomeworkExamComponent;
  let fixture: ComponentFixture<HomeworkExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeworkExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeworkExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
