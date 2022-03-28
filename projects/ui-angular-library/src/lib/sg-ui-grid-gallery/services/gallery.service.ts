import { Injectable } from '@angular/core'
import {
  Picsum,
  GalleryList,
  GroupGallery,
  IGallery
} from '../interfaces/picsum.interface'
import { GALLERY_LIMIT_GROUP, CSS_CLASSLIST } from '../constants/index'
import { GalleryHookService } from './hooks.service'

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  classes = CSS_CLASSLIST
  LIMIT = GALLERY_LIMIT_GROUP

  constructor(private hookService: GalleryHookService) {}

  private buildGalleyData({ main, last }: GroupGallery): IGallery {
    const isMainLengthMinorThanLimit =
      !!(main.length === 1) &&
      !!main[0]['length'] &&
      !!(main[0]?.length === this.LIMIT - 1)

    return {
      main: {
        list: main,
        show: main.length > 0,
        resetLayout: !!isMainLengthMinorThanLimit,
        classLayout: !!isMainLengthMinorThanLimit
          ? this.classes.oneColumn
          : this.classes.showTriad
      },
      last: {
        list: last,
        show: last && last.length > 0,
        classLayout: last.length <= 1 ? this.classes.oneColumn : ''
      }
    }
  }

  private groupByThree(gallery: GalleryList[]): Array<GalleryList[]> {
    const LENGTH = gallery.length
    // ----------------------
    return [...Array(LENGTH / this.LIMIT)].map((_, i) => {
      const LAST = this.LIMIT * (i + 1)
      const FIRST = LAST - this.LIMIT
      return gallery.slice(FIRST, LAST)
    })
  }

  private getGroupGallery(gallery: GalleryList[]) {
    const length = gallery.length
    const residual = length % this.LIMIT
    const isMinor = length < this.LIMIT
    // ----------------------
    const primary = isMinor
      ? [gallery]
      : this.groupByThree(gallery.slice(0, length - residual))
    const additionalList =
      isMinor || residual === 0 ? [] : gallery.slice(length - residual)
    // ----------------------
    return {
      main: primary,
      last: additionalList
    }
  }

  public getGallery(): Promise<Picsum[]> {
    return new Promise<Picsum[]>((resolve, reject) => {
      return this.hookService.getGallery().subscribe({
        next: (data: Picsum[]) => {
          resolve(data)
        },
        error: (err: any) => {
          reject(err)
        }
      })
    })
  }

  public buildGallery(list: GalleryList[]): IGallery {
    const { main, last } = this.getGroupGallery(list)

    return this.buildGalleyData({ main, last })
  }
}
