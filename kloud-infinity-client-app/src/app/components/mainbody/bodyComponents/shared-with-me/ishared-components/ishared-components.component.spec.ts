import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ISharedComponentsComponent } from './ishared-components.component';

describe('ISharedComponentsComponent', () => {
  let component: ISharedComponentsComponent;
  let fixture: ComponentFixture<ISharedComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ISharedComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ISharedComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
