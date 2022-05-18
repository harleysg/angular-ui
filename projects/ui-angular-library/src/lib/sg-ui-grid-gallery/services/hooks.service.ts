import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import {
  Picsum,
  Gallery,
  GalleryList,
  GalleryByStateroom
} from '../interfaces/picsum.interface'
import { IMAGE_SIZE } from '../constants/index'

interface AAAAAA {
  countList: number[]
  galleryList: GalleryList[]
}

@Injectable({
  providedIn: 'any'
})
export class GalleryHookService {
  constructor(private hooks: HelpersServices) {}

  public queryGallerySync(): Gallery {
    const gallery = this.hooks.EEEEEE()
    return {
      id: 'galleryComponent',
      sections: {
        selectorClass: '',
        gallery: gallery
      }
    }
  }

  public async getImagesAPI(): Promise<Gallery> {
    const staterooms = this.hooks.randomStaerooms()

    return Promise.allSettled(
      staterooms.map(() => this.hooks.getPromiseGallery())
    )
      .then(this.hooks.handlePromiseAllSettled().flatMapOptions)
      .then(({ countList, galleryList }) => {
        const gallery: GalleryByStateroom[] = []

        countList.reduce((prev, curr, i) => {
          gallery.push({
            name: `Stateroom ${i + 1}`,
            gallery: galleryList.slice(i === 0 ? 0 : prev, prev + curr)
          })

          return prev + curr
        }, 0)

        return {
          id: 'galleryComponent',
          sections: {
            selectorClass: '',
            gallery: gallery
          }
        }
      })
  }

  public resetGallery(): Gallery {
    return {
      id: 'galleryComponent',
      sections: {
        selectorClass: '',
        gallery: []
      }
    }
  }
}

@Injectable({
  providedIn: 'any'
})
class HelpersServices {
  SIZE = IMAGE_SIZE

  constructor(private http: HttpClient) {}

  public getPromiseGallery(): Promise<Picsum[]> {
    return new Promise<Picsum[]>((resolve, reject) => {
      return this.getGallery().subscribe({
        next: (data: Picsum[]) => resolve(data),
        error: (err: any) => reject(err)
      })
    })
  }

  public getGallery(): Observable<Picsum[]> {
    const plus = this.getRandomLimit(5)
    const limit = this.getRandomLimit(2, plus)

    return this.getImageRandom(limit)
  }

  private getImageRandom(limit: number) {
    const page = this.getRandomLimit(200)

    return this.http.get<Picsum[]>(
      `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
    )
  }

  EEEEEE(): GalleryByStateroom[] {
    const plus = this.getRandomLimit(2)
    const plus2 = this.getRandomLimit(5)
    const limit = this.getRandomLimit(2, plus)
    const stateroomLength = this.getRandomLimit(plus, limit)
    const list: GalleryList[] | [] = [
      ...Array(this.getRandomLimit(plus2, limit))
    ].map((_) => ({
      display: {
        url: 'https://via.placeholder.com/840x560',
        title: 'image - aspect ratio 2 / 3'
      },
      type: 'image'
    }))
    return [
      ...Array(stateroomLength)
        .fill('')
        .map((_, i) => ({
          name: `Stateroom ${i + 1}`,
          gallery: list
        }))
    ]
  }

  public randomStaerooms() {
    const plus = this.getRandomLimit(2)
    const limit = this.getRandomLimit(2, plus)
    const stateroomLength = this.getRandomLimit(plus, limit)
    return [
      ...Array(stateroomLength)
        .fill('')
        .map((_, i) => ({
          name: `Stateroom ${i + 1}`,
          gallery: [...Array(this.getRandomLimit(2, 5))].map((_) => ({
            display: {
              url: 'https://via.placeholder.com/840x560',
              title: 'image - aspect ratio 2 / 3'
            },
            type: 'image'
          }))
        }))
    ]
  }

  public getRandomLimit(range = 10, plus = 1): number {
    return Math.floor(Math.random() * range) + plus
  }

  private urlFromImage(image: Picsum, small?: boolean): string {
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

  public handlePromiseAllSettled() {
    return {
      filterOptions: {
        step_1: (results: PromiseSettledResult<Picsum[]>[]): Picsum[][] =>
          results
            .filter((x) => x.status === 'fulfilled')
            .map((x) => x.status === 'fulfilled' && x.value) as Picsum[][],
        step_2: (wow: Picsum[][]) => {
          let foo: GalleryList[] = []
          wow.forEach((picsum) => {
            let a = picsum.map(
              (pic: Picsum): GalleryList => ({
                ...this.formatDisplayImage(pic),
                type: 'image'
              })
            )
            foo.push(...a)
          })
          return foo
        }
      },
      flatMapOptions: (results: PromiseSettledResult<Picsum[]>[]): AAAAAA => {
        const countByList: number[] = []
        const galleryList = results
          .flatMap((x, i) => {
            if (x.status === 'fulfilled') {
              countByList[i] = x.value.length
              return x.value
            } else {
              return []
            }
          })
          .map(
            (_: Picsum): GalleryList => ({
              // ...this.formatDisplayImage(_),
              display: {
                url: 'https://via.placeholder.com/840x560',
                title: 'image - aspect ratio 2 / 3'
              },
              type: 'image'
            })
          )

        return {
          countList: countByList,
          galleryList
        }
      }
    }
  }
}
