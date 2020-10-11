import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardListOpenresourceComponent } from './dashboard-list-openresource.component';

describe('DashboardListOpenresourceComponent', () => {
  let component: DashboardListOpenresourceComponent;
  let fixture: ComponentFixture<DashboardListOpenresourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardListOpenresourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardListOpenresourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
