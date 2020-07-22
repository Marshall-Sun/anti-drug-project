import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchgroupComponent } from './searchgroup.component';

describe('SearchgroupComponent', () => {
  let component: SearchgroupComponent;
  let fixture: ComponentFixture<SearchgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
