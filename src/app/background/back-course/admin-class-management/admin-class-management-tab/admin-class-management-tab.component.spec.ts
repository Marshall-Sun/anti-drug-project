import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClassManagementTabComponent } from './admin-class-management-tab.component';

describe('AdminClassManagementTabComponent', () => {
  let component: AdminClassManagementTabComponent;
  let fixture: ComponentFixture<AdminClassManagementTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminClassManagementTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClassManagementTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
