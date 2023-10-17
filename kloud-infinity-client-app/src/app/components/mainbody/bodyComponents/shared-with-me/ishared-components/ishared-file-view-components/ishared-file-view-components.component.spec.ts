import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsharedFileViewComponentsComponent } from './ishared-file-view-components.component';

describe('IsharedFileViewComponentsComponent', () => {
  let component: IsharedFileViewComponentsComponent;
  let fixture: ComponentFixture<IsharedFileViewComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsharedFileViewComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IsharedFileViewComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
