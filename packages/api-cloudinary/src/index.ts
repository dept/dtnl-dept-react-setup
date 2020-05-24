import { v2 as cloudinary } from 'cloudinary'
import * as express from 'express'
import * as fs from 'fs'
import * as multer from 'multer'
import * as path from 'path'

interface RouterConfig {
  cloud_name: string
  api_key: string
  api_secret: string
}

function createUploader(tmpImgDir: string) {
  const tmpImgStorage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
      fs.mkdir(tmpImgDir, { recursive: true }, () => {
        cb(null, tmpImgDir)
      })
    },
    filename: function (req: any, file: any, cb: any) {
      cb(null, file.originalname)
    },
  })
  return multer({ storage: tmpImgStorage })
}

export const router = (config: RouterConfig) => {
  const tmpDir = path.join(process.cwd(), '/tmp')
  const uploader = createUploader(tmpDir)

  cloudinary.config(config)

  const router = express.Router()
  router.use(express.json())

  router.post('/upload', uploader.single('file') as any, async (req: any, res) => {
    try {
      const fileName = req.file.originalname
      const tmpPath = path.join(tmpDir, fileName)
      const { directory } = req.body

      const result = await cloudinary.uploader.upload(tmpPath, {
        folder: directory,
      })

      res.send(result)
    } catch {
      res.status(500).json({ status: 'error', message: 'Cloudinary upload failed' })
    }
  })

  return router
}
