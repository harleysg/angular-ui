import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { GridGalleryComponent } from './sg-ui-grid-gallery.component';
import { GalleryService } from './services/gallery.service';
import { GalleryHookService } from './services/hooks.service';
import { ImageComponent } from './components/image/image.component';

@NgModule({
  declarations: [GridGalleryComponent, ImageComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [GridGalleryComponent],
  providers: [GalleryService, GalleryHookService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GridGalleryModule {}
