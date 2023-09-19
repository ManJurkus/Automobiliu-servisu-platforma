import path from 'path';
import express from 'express';
import multer from 'multer';

export const upload = express.Router();


const servisasStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/servisas');
    },
    filename: (req, file, cb) => {
        cb(null, 'servisas_' + Date.now() + path.extname(file.originalname));
    },
});
const servisasUpload = multer({
    storage: servisasStorage,
    limits: {
        fileSize: 1e7,
    },
});

upload.use('/servisas', servisasUpload.single('servisas_image'), (req, res) => {
    return res.status(201).json({
        status: 'ok',
        msg: 'Upload complete.',
        path: 'images/servisas/' + req.file.filename,
    });
});


/***********/

upload.use('/', (req, res) => {
    return res.status(400).json({
        status: 'err',
        msg: 'Upsupported "Upload" route.',
        options: [
            'http://localhost:3001/api/upload/fund',
        ],
    });
});

upload.use((req, res, next) => {
    return res.status(404).json({ msg: 'Unsupported "Upload" method' });
});