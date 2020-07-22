import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenRsourceVideoPlayerComponent } from './openResource-video-player.component';

describe('OpenRsourceVideoPlayerComponent', () => {
  let component: OpenRsourceVideoPlayerComponent;
  let fixture: ComponentFixture<OpenRsourceVideoPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenRsourceVideoPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenRsourceVideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
