import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTagManagementComponent } from './admin-tag-management.component';

describe('AdminTagManagementComponent', () => {
  let component: AdminTagManagementComponent;
  let fixture: ComponentFixture<AdminTagManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTagManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTagManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
