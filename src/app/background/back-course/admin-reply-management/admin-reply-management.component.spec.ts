import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReplyManagementComponent } from './admin-reply-management.component';

describe('AdminReplyManagementComponent', () => {
  let component: AdminReplyManagementComponent;
  let fixture: ComponentFixture<AdminReplyManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminReplyManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReplyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
