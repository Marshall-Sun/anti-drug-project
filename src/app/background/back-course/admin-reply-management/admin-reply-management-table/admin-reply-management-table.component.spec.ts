import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReplyManagementTableComponent } from './admin-reply-management-table.component';

describe('AdminReplyManagementTableComponent', () => {
  let component: AdminReplyManagementTableComponent;
  let fixture: ComponentFixture<AdminReplyManagementTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminReplyManagementTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReplyManagementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
