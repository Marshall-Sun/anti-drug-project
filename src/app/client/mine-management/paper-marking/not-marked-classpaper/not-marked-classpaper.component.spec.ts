import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotMarkedClasspaperComponent } from './not-marked-classpaper.component';

describe('NotMarkedClasspaperComponent', () => {
  let component: NotMarkedClasspaperComponent;
  let fixture: ComponentFixture<NotMarkedClasspaperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotMarkedClasspaperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotMarkedClasspaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
