import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Picsum } from '../interfaces/picsum.interface'
import { IMAGE_SIZE, GALLERY_LIMIT_GROUP } from '../constants/index'

@Injectable({
  providedIn: 'any'
})
export class GalleryHookService {
  LIMIT = GALLERY_LIMIT_GROUP
  SIZE = IMAGE_SIZE

  constructor(private http: HttpClient) {}

  public getRandomLimit(range = 10, plus = 1): number {
    return Math.floor(Math.random() * range) + plus
  }

  public formatDisplayImage(picsum: Picsum) {
    const url = this.urlFromImage(picsum)
    const { author } = picsum
    return {
      display: {
        url,
        alt: author
      }
    }
  }

  public getImageRandom(limit: number) {
    const page = this.getRandomLimit(15)
    return this.http.get<Picsum[]>(
      `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
    )
  }

  public urlFromImage(image: Picsum, small?: boolean): string {
    const _ = small ? this.SIZE.small : this.SIZE.big
    const image_size = `${_.w}/${_.h}`
    const regex = /[0-9]{2,4}\/\w+$/gm
    const match = image.download_url.match(regex)
    let url = ''
    if (match !== null) {
      url = `${image.download_url.split(regex)[0]}${image_size}`
    } else {
      url = `https://picsum.photos/id/112/${image_size}`
    }
    return url
  }

  public getGallery(): Observable<Picsum[]> {
    const plus = this.getRandomLimit(5)
    const limit = this.getRandomLimit(2, plus)
    return this.getImageRandom(limit)
  }
}
