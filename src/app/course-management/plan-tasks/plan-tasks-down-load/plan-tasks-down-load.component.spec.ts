import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanTasksDownLoadComponent } from './plan-tasks-down-load.component';

describe('PlanTasksDownLoadComponent', () => {
  let component: PlanTasksDownLoadComponent;
  let fixture: ComponentFixture<PlanTasksDownLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanTasksDownLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanTasksDownLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
