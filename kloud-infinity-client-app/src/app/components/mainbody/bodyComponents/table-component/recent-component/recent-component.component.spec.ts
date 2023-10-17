import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentComponentComponent } from './recent-component.component';

describe('RecentComponentComponent', () => {
  let component: RecentComponentComponent;
  let fixture: ComponentFixture<RecentComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
