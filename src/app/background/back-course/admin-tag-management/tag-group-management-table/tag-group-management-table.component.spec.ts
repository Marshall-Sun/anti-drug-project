import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagGroupManagementTableComponent } from './tag-group-management-table.component';

describe('TagGroupManagementTableComponent', () => {
  let component: TagGroupManagementTableComponent;
  let fixture: ComponentFixture<TagGroupManagementTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagGroupManagementTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagGroupManagementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
