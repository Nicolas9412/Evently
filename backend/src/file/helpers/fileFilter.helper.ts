export const FileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: Function,
) => {
  if (!file) return cb(new Error('File is empty'), false);
  const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];
  const extensionFile = file.mimetype.split('/')[1];
  if (validExtensions.includes(extensionFile)) {
    return cb(null, true);
  }
  return cb(null, false);
};
