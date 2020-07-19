import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPaperEditComponent } from './test-paper-edit.component';

describe('TestPaperEditComponent', () => {
  let component: TestPaperEditComponent;
  let fixture: ComponentFixture<TestPaperEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestPaperEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPaperEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
