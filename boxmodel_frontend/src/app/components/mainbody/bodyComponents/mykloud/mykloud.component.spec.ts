import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MykloudComponent } from './mykloud.component';

describe('MykloudComponent', () => {
  let component: MykloudComponent;
  let fixture: ComponentFixture<MykloudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MykloudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MykloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
