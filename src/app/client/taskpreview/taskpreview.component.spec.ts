import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskpreviewComponent } from './taskpreview.component';

describe('TaskpreviewComponent', () => {
  let component: TaskpreviewComponent;
  let fixture: ComponentFixture<TaskpreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskpreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
