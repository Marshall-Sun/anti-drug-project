import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagTabComponent } from './tag-tab.component';

describe('TagTabComponent', () => {
  let component: TagTabComponent;
  let fixture: ComponentFixture<TagTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
