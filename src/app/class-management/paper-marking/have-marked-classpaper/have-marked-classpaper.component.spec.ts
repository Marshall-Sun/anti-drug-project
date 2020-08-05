import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HaveMarkedClasspaperComponent } from './have-marked-classpaper.component';

describe('HaveMarkedClasspaperComponent', () => {
  let component: HaveMarkedClasspaperComponent;
  let fixture: ComponentFixture<HaveMarkedClasspaperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaveMarkedClasspaperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaveMarkedClasspaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
