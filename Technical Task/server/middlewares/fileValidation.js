const path = require('path')
exports.fileValidation = (req, res, next) => {
    const file = req.file;
    let ext = path.extname(file.originalname).toLowerCase()
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
        req.fileValidationError = "Forbidden extension";
        return res.status(200).json({ success: false, message: 'not valid file format' })
    }
    next()
}
