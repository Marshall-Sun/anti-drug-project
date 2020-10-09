import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsManagementTableComponent } from './news-management-table.component';

describe('NewsManagementTableComponent', () => {
  let component: NewsManagementTableComponent;
  let fixture: ComponentFixture<NewsManagementTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsManagementTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsManagementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
