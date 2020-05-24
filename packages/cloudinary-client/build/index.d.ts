import { Media, MediaStore, MediaUploadOptions } from '@tinacms/media'
import { Cloudinary } from 'cloudinary-core'
interface CloudinaryMediaStoreConfig {
  baseUrl: string
  cloudName: string
}
export declare class CloudinaryMediaStore implements MediaStore {
  private config
  accept: string
  cl: Cloudinary
  constructor(config: CloudinaryMediaStoreConfig)
  getFieldProps(): {
    previewSrc: (formData: any) => string
    uploadDir: () => string
    parse: (
      filename: string,
    ) => {
      filename: string
      url: string
    }
  }
  writeMediaToCloud(data: { directory: string; content: File }): Promise<any>
  persist(files: MediaUploadOptions[]): Promise<Media[]>
}
export {}
