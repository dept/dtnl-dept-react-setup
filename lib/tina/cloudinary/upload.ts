import * as fs from 'fs'
import multer from 'multer'

export function createUploader(tmpImgDir: string) {
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
