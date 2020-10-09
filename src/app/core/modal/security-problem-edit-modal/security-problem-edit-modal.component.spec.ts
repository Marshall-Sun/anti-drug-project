import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityProblemEditModalComponent } from './security-problem-edit-modal.component';

describe('SecurityProblemEditModalComponent', () => {
  let component: SecurityProblemEditModalComponent;
  let fixture: ComponentFixture<SecurityProblemEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityProblemEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityProblemEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
