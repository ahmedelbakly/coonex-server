import multer from "multer";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, Date.now() + file.originalname)
    }
  })
  
 export  const upload = multer({ storage: storage})
 export const uploadMulti = upload.fields([{name:"logo",maxCount:1},{name:"proImg",maxCount:10}])