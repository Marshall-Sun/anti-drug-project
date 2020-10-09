import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagManagementTableComponent } from './tag-management-table.component';

describe('TagManagementTableComponent', () => {
  let component: TagManagementTableComponent;
  let fixture: ComponentFixture<TagManagementTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagManagementTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagManagementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
