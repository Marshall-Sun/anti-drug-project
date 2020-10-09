import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewHomeworkComponent } from './preview-homework.component';

describe('PreviewHomeworkComponent', () => {
  let component: PreviewHomeworkComponent;
  let fixture: ComponentFixture<PreviewHomeworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewHomeworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewHomeworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
