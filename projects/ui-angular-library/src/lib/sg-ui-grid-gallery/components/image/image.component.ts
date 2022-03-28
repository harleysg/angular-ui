import { Component, Input } from '@angular/core'
import { ASPECT_RATIO } from '../../constants/index'
import { GalleryList } from '../../interfaces/picsum.interface'

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styles: [
    `
      figure {
        padding: 0;
        margin: 0;
        max-width: max-content;
      }

      img {
        width: 100%;
        max-width: 100%;
        display: block;
        aspect-ratio: ${ASPECT_RATIO['3_2'].val};
      }
    `
  ]
})
export class ImageComponent {
  @Input() image!: GalleryList

  constructor() {}

  urlFromImage(image: GalleryList): string {
    return `${image.display?.url}`
  }
}
