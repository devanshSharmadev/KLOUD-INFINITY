import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSyncFileComponent } from './view-sync-file.component';

describe('ViewSyncFileComponent', () => {
  let component: ViewSyncFileComponent;
  let fixture: ComponentFixture<ViewSyncFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSyncFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSyncFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
