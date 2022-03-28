import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GalleryService } from './services/gallery.service';
import { GroupGallery } from './interfaces/picsum.interface';
import { IGallery, GalleryByStateroom } from './interfaces/picsum.interface';
import { IMAGE_SIZE, GALLERY_LIMIT_GROUP } from './constants/index';

@Component({
  selector: 'sg-ui-grid-gallery',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})
export class GridGalleryComponent implements OnInit, AfterViewInit {
  @Input() showMesagge: boolean = false;
  @Input() galleryData!: GalleryByStateroom;
  @Input() galleryName!: string;

  @ViewChild('galleryRef', { static: false }) galleryRef!: ElementRef;

  LIMIT = GALLERY_LIMIT_GROUP;
  gallery!: IGallery;
  message?: any; // ---- Optional

  constructor(private galleryService: GalleryService) {}

  ngOnInit() {
    this.getGallery();
  }

  ngAfterViewInit() {
    if (this.galleryRef) {
      this.galleryRef.nativeElement.style.maxWidth = `${IMAGE_SIZE.big.w}px`;
    }
  }

  getGallery() {
    this.gallery = this.galleryService.buildGallery(this.galleryData.list);

    if (this.showMesagge)
      this.setMessage({
        main: this.gallery.main.list,
        last: this.gallery.last.list,
      }); // ---- Optional
  }

  // ------------------------------------------------- Optional
  setMessage({ main, last }: GroupGallery) {
    this.message = {
      gallery: main.length * 3,
      lastGallery: last.length,
      isLastGallery: this.gallery.last.show,
      resetLayout: main.length === 1 && main[0]['length'] === this.LIMIT - 1,
    };
  }
}
