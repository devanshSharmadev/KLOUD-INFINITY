import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedFilesTableComponent } from './shared-files-table.component';

describe('SharedFilesTableComponent', () => {
  let component: SharedFilesTableComponent;
  let fixture: ComponentFixture<SharedFilesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedFilesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedFilesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
