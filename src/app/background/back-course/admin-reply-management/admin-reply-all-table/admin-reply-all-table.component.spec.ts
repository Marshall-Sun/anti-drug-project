import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReplyAllTableComponent } from './admin-reply-all-table.component';

describe('AdminReplyAllTableComponent', () => {
  let component: AdminReplyAllTableComponent;
  let fixture: ComponentFixture<AdminReplyAllTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminReplyAllTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReplyAllTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
