import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReplyManagementTabComponent } from './admin-reply-management-tab.component';

describe('AdminReplyManagementTabComponent', () => {
  let component: AdminReplyManagementTabComponent;
  let fixture: ComponentFixture<AdminReplyManagementTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminReplyManagementTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReplyManagementTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
