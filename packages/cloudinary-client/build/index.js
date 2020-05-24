'use strict'
const __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
Object.defineProperty(exports, '__esModule', { value: true })
const cloudinary_core_1 = require('cloudinary-core')
class CloudinaryMediaStore {
  constructor(config) {
    this.config = config
    this.accept = '*'
    this.cl = new cloudinary_core_1.Cloudinary({ cloud_name: config.cloudName })
  }
  getFieldProps() {
    return {
      previewSrc: formData => {
        return this.cl.url(formData.image.filename, { width: 300, crop: 'fit' })
      },
      uploadDir: () => {
        return '/uploads'
      },
      parse: filename => {
        const url = this.cl.url(filename)
        return {
          filename,
          url,
        }
      },
    }
  }
  writeMediaToCloud(data) {
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
  persist(files) {
    return __awaiter(this, void 0, void 0, function* () {
      const uploaded = []
      for (const { file, directory } of files) {
        const response = yield this.writeMediaToCloud({
          directory,
          content: file,
        }).then(res => res.json())
        uploaded.push({
          filename: response.public_id,
          directory,
        })
      }
      return uploaded
    })
  }
}
exports.CloudinaryMediaStore = CloudinaryMediaStore
//# sourceMappingURL=index.js.map
