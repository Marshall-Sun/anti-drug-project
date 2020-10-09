import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTopicClassTableComponent } from './admin-topic-class-table.component';

describe('AdminTopicClassTableComponent', () => {
  let component: AdminTopicClassTableComponent;
  let fixture: ComponentFixture<AdminTopicClassTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTopicClassTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTopicClassTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
