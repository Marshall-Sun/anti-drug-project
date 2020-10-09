import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationHeaderComponent } from './operation-header.component';

describe('OperationHeaderComponent', () => {
  let component: OperationHeaderComponent;
  let fixture: ComponentFixture<OperationHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
