import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskTopSynchingComponent } from './desk-top-synching.component';

describe('DeskTopSynchingComponent', () => {
  let component: DeskTopSynchingComponent;
  let fixture: ComponentFixture<DeskTopSynchingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeskTopSynchingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeskTopSynchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
