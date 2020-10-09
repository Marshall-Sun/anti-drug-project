import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenresourcedetailComponent } from './openresourcedetail.component';

describe('OpenresourcedetailComponent', () => {
  let component: OpenresourcedetailComponent;
  let fixture: ComponentFixture<OpenresourcedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenresourcedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenresourcedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
