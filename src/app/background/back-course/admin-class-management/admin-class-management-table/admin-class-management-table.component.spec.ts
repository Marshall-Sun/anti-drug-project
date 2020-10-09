import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClassManagementTableComponent } from './admin-class-management-table.component';

describe('AdminClassManagementTableComponent', () => {
  let component: AdminClassManagementTableComponent;
  let fixture: ComponentFixture<AdminClassManagementTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminClassManagementTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClassManagementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
