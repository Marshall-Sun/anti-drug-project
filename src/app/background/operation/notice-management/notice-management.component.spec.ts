import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeManagementComponent } from './notice-management.component';

describe('NoticeManagementComponent', () => {
  let component: NoticeManagementComponent;
  let fixture: ComponentFixture<NoticeManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
