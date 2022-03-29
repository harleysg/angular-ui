import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core'
import { GalleryService } from './services/gallery.service'
import { IGallery, GalleryByStateroom } from './interfaces/picsum.interface'
import { IMAGE_SIZE, GALLERY_LIMIT_GROUP } from './constants/index'

@Component({
  selector: 'sg-ui-grid-gallery',
  templateUrl: './index.html',
  styleUrls: ['./index.scss']
})
export class GridGalleryComponent implements OnInit, AfterViewInit {
  @Input() showMesagge: boolean = false
  @Input() galleryData!: GalleryByStateroom
  @Input() galleryName!: string

  @ViewChild('galleryRef', { static: false }) galleryRef!: ElementRef

  LIMIT = GALLERY_LIMIT_GROUP
  gallery!: IGallery

  constructor(private galleryService: GalleryService) {}

  ngOnInit() {
    this.getGallery()
  }

  ngAfterViewInit() {
    if (this.galleryRef) {
      this.galleryRef.nativeElement.style.maxWidth = `${IMAGE_SIZE.big.w}px`
    }
  }

  getGallery() {
    this.gallery = this.galleryService.buildGallery(this.galleryData.list)
  }
}
