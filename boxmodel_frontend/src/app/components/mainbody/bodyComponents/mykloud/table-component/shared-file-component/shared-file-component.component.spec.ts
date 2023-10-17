import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedFileComponentComponent } from './shared-file-component.component';

describe('SharedFileComponentComponent', () => {
  let component: SharedFileComponentComponent;
  let fixture: ComponentFixture<SharedFileComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedFileComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedFileComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
