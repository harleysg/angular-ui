import { Picsum } from './picsum.interface'

export type MainGallery = Picsum[]

export interface IGalleryLayout {
  show: boolean
  resetLayout?: boolean
  classLayout: string
  minorThanLimit?: boolean
}

export interface GroupGallery {
  main: Picsum[][]
  last: Picsum[]
}

interface ILastGalleryLayout extends IGalleryLayout {
  list: Picsum[]
}

interface IMainGalleryLayout extends IGalleryLayout {
  list: Picsum[][]
}

export interface IGallery {
  main: IMainGalleryLayout
  last: ILastGalleryLayout
}
