import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarredTableComponent } from './starred-table.component';

describe('StarredTableComponent', () => {
  let component: StarredTableComponent;
  let fixture: ComponentFixture<StarredTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarredTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarredTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
