import { Injectable } from '@angular/core'
import {
  GalleryList,
  GroupGallery,
  IGallery,
  Layout
} from '../interfaces/picsum.interface'
import {
  GALLERY_LIMIT_GROUP,
  CSS_CLASSLIST,
  LAYOUT_DEFAULT
} from '../constants/index'

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  classes = CSS_CLASSLIST
  LIMIT = GALLERY_LIMIT_GROUP
  LAYOUT!: Layout

  constructor() {}

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

  public buildGallery(list: GalleryList[]): IGallery {
    const { main, last } = this.getGroupGallery(list)

    return this.buildGalleyData({ main, last })
  }

  public buildLayout(list: GalleryList[]): Layout {
    const LENGTH = list.length
    const layout = {
      ...LAYOUT_DEFAULT,
      shouldShow: LENGTH > 0
    }

    if (LENGTH >= this.LIMIT) {
      const listModule = Math.floor(LENGTH % this.LIMIT)

      switch (listModule) {
        case 0:
          layout.value = 'by-triad'
          return layout
        case 1:
          layout.value = 'by-triad by-triad-1'
          layout.hasTwoLeftOver = false
          return layout
        case 2:
          layout.value = 'by-triad by-triad-2'
          layout.hasTwoLeftOver = true
          return layout
      }
    }

    layout.value = 'by-one-column'
    layout.hasTwoLeftOver = false

    return layout
  }
}
