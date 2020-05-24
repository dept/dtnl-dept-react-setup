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
exports.router = void 0
const cloudinary_1 = require('cloudinary')
const express = require('express')
const fs = require('fs')
const multer = require('multer')
const path = require('path')
function createUploader(tmpImgDir) {
  const tmpImgStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      fs.mkdir(tmpImgDir, { recursive: true }, () => {
        cb(null, tmpImgDir)
      })
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    },
  })
  return multer({ storage: tmpImgStorage })
}
exports.router = config => {
  const tmpDir = path.join(process.cwd(), '/tmp')
  const uploader = createUploader(tmpDir)
  cloudinary_1.v2.config(config)
  const router = express.Router()
  router.use(express.json())
  router.post('/upload', uploader.single('file'), (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      try {
        const fileName = req.file.originalname
        const tmpPath = path.join(tmpDir, fileName)
        const { directory } = req.body
        const result = yield cloudinary_1.v2.uploader.upload(tmpPath, {
          folder: directory,
        })
        res.send(result)
      } catch (_a) {
        res.status(500).json({ status: 'error', message: 'Cloudinary upload failed' })
      }
    }),
  )
  return router
}
//# sourceMappingURL=index.js.map
