import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedToComponentsComponent } from './shared-to-components.component';

describe('SharedToComponentsComponent', () => {
  let component: SharedToComponentsComponent;
  let fixture: ComponentFixture<SharedToComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedToComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedToComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
