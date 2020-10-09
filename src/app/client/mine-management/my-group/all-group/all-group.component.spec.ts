import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGroupComponent } from './all-group.component';

describe('AllGroupComponent', () => {
  let component: AllGroupComponent;
  let fixture: ComponentFixture<AllGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
