import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyComputersComponent } from './my-computers.component';

describe('MyComputersComponent', () => {
  let component: MyComputersComponent;
  let fixture: ComponentFixture<MyComputersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyComputersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyComputersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
