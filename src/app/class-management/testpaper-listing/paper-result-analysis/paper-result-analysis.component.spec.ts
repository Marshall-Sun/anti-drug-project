import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperResultAnalysisComponent } from './paper-result-analysis.component';

describe('PaperResultAnalysisComponent', () => {
  let component: PaperResultAnalysisComponent;
  let fixture: ComponentFixture<PaperResultAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperResultAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperResultAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
