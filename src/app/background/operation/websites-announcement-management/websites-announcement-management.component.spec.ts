import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsitesAnnouncementManagementComponent } from './websites-announcement-management.component';

describe('WebsitesAnnouncementManagementComponent', () => {
  let component: WebsitesAnnouncementManagementComponent;
  let fixture: ComponentFixture<WebsitesAnnouncementManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsitesAnnouncementManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsitesAnnouncementManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
