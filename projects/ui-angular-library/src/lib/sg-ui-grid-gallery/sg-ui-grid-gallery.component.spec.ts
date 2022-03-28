import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridGalleryComponent } from './sg-ui-grid-gallery.component';

describe('GalleryComponent', () => {
  let component: GridGalleryComponent;
  let fixture: ComponentFixture<GridGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GridGalleryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
