import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTopicManagementTabComponent } from './group-topic-management-tab.component';

describe('GroupTopicManagementTabComponent', () => {
  let component: GroupTopicManagementTabComponent;
  let fixture: ComponentFixture<GroupTopicManagementTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupTopicManagementTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupTopicManagementTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
