import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenresourceComponent } from './openresource.component';

describe('OpenresourceComponent', () => {
  let component: OpenresourceComponent;
  let fixture: ComponentFixture<OpenresourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenresourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenresourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
