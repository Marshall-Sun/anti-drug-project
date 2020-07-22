import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchopensorComponent } from './searchopensor.component';

describe('SearchopensorComponent', () => {
  let component: SearchopensorComponent;
  let fixture: ComponentFixture<SearchopensorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchopensorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchopensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
