export interface Picsum {
  id: number
  author: string
  width: number
  height: number
  url: string
  download_url: string
}

export interface IGalleryLayout {
  show?: boolean
  resetLayout?: boolean
  classLayout: string
  minorThanLimit?: boolean
}

type GalleryMultimediaTypes = 'image' | 'video' | '360'

export interface GalleryList {
  type: GalleryMultimediaTypes
  display?: {
    url: string
    title?: string
  }
}

export interface GalleryByStateroom {
  name: string
  list: GalleryList[] | []
}

interface ILastGalleryLayout extends IGalleryLayout {
  // name: string
  list: GalleryList[]
}

interface IMainGalleryLayout extends IGalleryLayout {
  // name: string
  list: GalleryList[][]
}

export interface IGallery {
  main: IMainGalleryLayout
  last: ILastGalleryLayout
}

export interface GroupGallery {
  main: GalleryList[][]
  last: GalleryList[]
}

export interface GalleryMap {
  selectorClass?: string
  gallery: GalleryByStateroom[]
}

export interface Gallery {
  id: string
  sections: GalleryMap
}
