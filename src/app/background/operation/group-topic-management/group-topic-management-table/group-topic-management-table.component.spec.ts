import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTopicManagementTableComponent } from './group-topic-management-table.component';

describe('GroupTopicManagementTableComponent', () => {
  let component: GroupTopicManagementTableComponent;
  let fixture: ComponentFixture<GroupTopicManagementTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupTopicManagementTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupTopicManagementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
