import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCredComponent } from './login-cred.component';

describe('LoginCredComponent', () => {
  let component: LoginCredComponent;
  let fixture: ComponentFixture<LoginCredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginCredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginCredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
