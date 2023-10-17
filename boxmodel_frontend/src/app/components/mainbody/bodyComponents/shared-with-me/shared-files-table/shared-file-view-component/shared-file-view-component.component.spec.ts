import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedFileViewComponentComponent } from './shared-file-view-component.component';

describe('SharedFileViewComponentComponent', () => {
  let component: SharedFileViewComponentComponent;
  let fixture: ComponentFixture<SharedFileViewComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedFileViewComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedFileViewComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
