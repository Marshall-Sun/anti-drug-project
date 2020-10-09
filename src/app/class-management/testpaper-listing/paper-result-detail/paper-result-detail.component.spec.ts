import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperResultDetailComponent } from './paper-result-detail.component';

describe('PaperResultDetailComponent', () => {
  let component: PaperResultDetailComponent;
  let fixture: ComponentFixture<PaperResultDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperResultDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperResultDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
