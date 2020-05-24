import { Media, MediaStore, MediaUploadOptions } from '@tinacms/media'
import { Cloudinary } from 'cloudinary-core'

interface CloudinaryMediaStoreConfig {
  baseUrl: string
  cloudName: string
}

export class CloudinaryMediaStore implements MediaStore {
  accept = '*'
  cl: Cloudinary

  constructor(private config: CloudinaryMediaStoreConfig) {
    this.cl = new Cloudinary({ cloud_name: config.cloudName })
  }

  getFieldProps(name: string) {
    return {
      previewSrc: (formData: any) => {
        const field = formData[name]

        if (!field) {
          return
        }

        return this.cl.url(field.filename, { width: 300, crop: 'fit' })
      },
      uploadDir: () => {
        return '/uploads'
      },
      parse: (filename: string) => {
        const url = this.cl.url(filename)
        return {
          filename,
          url,
        }
      },
    }
  }

  writeMediaToCloud(data: { directory: string; content: File }): Promise<any> {
    const formData = new FormData()
    formData.append('file', data.content)
    formData.append('directory', data.directory)
    return fetch(`${this.config.baseUrl}/upload`, {
      method: 'POST',
      body: formData,
    }).catch(e => {
      console.error(e)
    })
  }

  async persist(files: MediaUploadOptions[]): Promise<Media[]> {
    const uploaded: Media[] = []

    for (const { file, directory } of files) {
      const response = await this.writeMediaToCloud({
        directory,
        content: file,
      }).then(res => res.json())

      uploaded.push({
        filename: response.public_id,
        directory,
      })
    }

    return uploaded
  }
}
