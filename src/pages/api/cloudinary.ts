import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import multer from 'multer'
import { NextApiResponse } from 'next'
import path from 'path'

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

const tmpDir = path.join(process.cwd(), '/tmp')
const uploader = createUploader(tmpDir)

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function cloudinaryRequest(req: any, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(500).end()
    return
  }

  try {
    const upload = uploader.single('file') as any

    upload(req, {}, async (err: Error) => {
      const fileName = req.file.originalname
      const tmpPath = path.join(tmpDir, fileName)
      const { directory } = req.body

      const result = await cloudinary.uploader.upload(tmpPath, {
        folder: directory,
      })

      res.send(result)
    })
  } catch {
    res.status(500).json({ status: 'error', message: 'Cloudinary upload failed' })
  }
}
