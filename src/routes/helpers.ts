import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import { FacadeMiembros } from "../controllers/facadeMiembros";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/static/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const imageFilter = function (req: any, file: Express.Multer.File, cb: any) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter }).array('images');

export async function saveImages(req: Request, res: Response): Promise<String[]> {
  return await new Promise<String[]>((resolve, reject) => {
    upload(req, res, function (err: any) {
        if ((<any>req).fileValidationError)
          reject((<any>req).fileValidationError);
        else if (!req.files)
          reject('Please select an image to upload');
        else if (err)
          reject(err);
        console.log(req.files);
        // @ts-ignore
        resolve(req.files.map((f) => f.filename));
      }
    );
  });
}

const uploadLogo = multer({ storage: storage, fileFilter: imageFilter }).single('logo');

export async function registerImage(req: Request, res: Response): Promise<String> {
  return await new Promise<String>((resolve, reject) => {
    uploadLogo(req, res, function (err: any) {
        if ((<any>req).fileValidationError)
          reject((<any>req).fileValidationError);
        else if (!req.file)
          reject('Please select an image to upload');
        else if (err)
          reject(err);
        // @ts-ignore
        console.log("Files: ", req.file);
        resolve("123");
      }
    );
  });
}
