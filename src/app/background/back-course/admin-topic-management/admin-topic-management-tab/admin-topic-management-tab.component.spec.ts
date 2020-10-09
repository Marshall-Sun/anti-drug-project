import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTopicManagementTabComponent } from './admin-topic-management-tab.component';

describe('AdminTopicManagementTabComponent', () => {
  let component: AdminTopicManagementTabComponent;
  let fixture: ComponentFixture<AdminTopicManagementTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTopicManagementTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTopicManagementTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
