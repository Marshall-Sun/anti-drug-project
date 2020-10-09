import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPasswdEditModelComponent } from './login-passwd-edit-model.component';

describe('LoginPasswdEditModelComponent', () => {
  let component: LoginPasswdEditModelComponent;
  let fixture: ComponentFixture<LoginPasswdEditModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPasswdEditModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPasswdEditModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
