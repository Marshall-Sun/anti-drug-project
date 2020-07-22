import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchclassComponent } from './searchclass.component';

describe('SearchclassComponent', () => {
  let component: SearchclassComponent;
  let fixture: ComponentFixture<SearchclassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchclassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
