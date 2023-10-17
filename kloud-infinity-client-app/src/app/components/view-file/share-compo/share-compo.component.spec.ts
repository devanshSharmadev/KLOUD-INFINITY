import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareCompoComponent } from './share-compo.component';

describe('ShareCompoComponent', () => {
  let component: ShareCompoComponent;
  let fixture: ComponentFixture<ShareCompoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareCompoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareCompoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
