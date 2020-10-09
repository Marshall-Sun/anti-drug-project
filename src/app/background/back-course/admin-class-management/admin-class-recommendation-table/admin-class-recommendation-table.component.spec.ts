import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClassRecommendationTableComponent } from './admin-class-recommendation-table.component';

describe('AdminClassRecommendationTableComponent', () => {
  let component: AdminClassRecommendationTableComponent;
  let fixture: ComponentFixture<AdminClassRecommendationTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminClassRecommendationTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClassRecommendationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
