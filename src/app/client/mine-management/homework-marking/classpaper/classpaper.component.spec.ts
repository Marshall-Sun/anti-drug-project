import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasspaperComponent } from './classpaper.component';

describe('ClasspaperComponent', () => {
  let component: ClasspaperComponent;
  let fixture: ComponentFixture<ClasspaperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasspaperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasspaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
