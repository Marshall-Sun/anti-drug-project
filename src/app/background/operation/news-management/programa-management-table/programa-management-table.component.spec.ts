import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramaManagementTableComponent } from './programa-management-table.component';

describe('ProgramaManagementTableComponent', () => {
  let component: ProgramaManagementTableComponent;
  let fixture: ComponentFixture<ProgramaManagementTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramaManagementTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramaManagementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
