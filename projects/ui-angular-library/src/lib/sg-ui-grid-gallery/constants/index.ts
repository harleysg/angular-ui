const ASPECT_RATIO = {
  '3_2': {
    val: '3 / 2',
    h: 2 / 3,
    w: 3 / 2
  }
}

export const LAYOUT_DEFAULT = {
  shouldShow: false,
  value: 'by-triad',
  hasTwoLeftOver: false
}

export const CSS_CLASSLIST = {
  oneColumn: 'has-one-column',
  showTriad: 'by-triad'
}

const GALLERY_LIMIT_GROUP = 3

const IMAGE_SIZE = {
  big: {
    w: 840,
    h: 840 * ASPECT_RATIO['3_2'].h
  },
  small: {
    w: 277,
    h: 277 * ASPECT_RATIO['3_2'].w
  }
}

export { ASPECT_RATIO, IMAGE_SIZE, GALLERY_LIMIT_GROUP }
