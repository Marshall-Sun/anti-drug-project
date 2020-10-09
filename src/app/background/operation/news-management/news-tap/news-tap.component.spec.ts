import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsTapComponent } from './news-tap.component';

describe('NewsTapComponent', () => {
  let component: NewsTapComponent;
  let fixture: ComponentFixture<NewsTapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsTapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsTapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
