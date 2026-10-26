import manifest from '@/contents/photography/photos.json'

export type Photograph = {
  id: string
  src: string
  thumbnail: string
  width: number
  height: number
  title: string
  alt: string
  collection: string
  date?: string
  location?: string
  credit?: string
}

export const photographs = manifest.items as Photograph[]
export const photographyPublished = manifest.published && photographs.length > 0

// A development-only interface sample; never represented as the owner's photography.
export const photographPreview: Photograph[] = [
  {
    id: 'interface-preview',
    src: '/window-portrait.webp',
    thumbnail: '/window-portrait.webp',
    width: 1024,
    height: 576,
    title: 'Window portrait',
    alt: 'Kwanho beside a window overlooking green foliage',
    collection: 'Window portraits',
  },
  {
    id: 'window-preview',
    src: '/photography-preview-window.webp',
    thumbnail: '/photography-preview-window.webp',
    width: 819,
    height: 1024,
    title: 'A window study',
    alt: 'Kwanho holding a camera beside a window with green foliage outside',
    collection: 'Window portraits',
  },
  {
    id: 'camera-preview',
    src: '/photography-preview-camera.webp',
    thumbnail: '/photography-preview-camera.webp',
    width: 1024,
    height: 682,
    title: 'Behind the camera',
    alt: 'Kwanho holding a camera in front of his face, surrounded by green foliage',
    collection: 'Camera portrait',
  },
]
