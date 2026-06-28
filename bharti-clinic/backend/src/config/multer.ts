import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

type UploadCategory = 'gallery' | 'products' | 'blog';

const UPLOAD_ROOT = path.join(__dirname, '..', '..', 'uploads');

function ensureDirExists(dir: string) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function createStorage(category: UploadCategory): multer.StorageEngine {
    const destinationPath = path.join(UPLOAD_ROOT, category);

    return multer.diskStorage({
        destination(_req, _file, cb) {
            try {
                ensureDirExists(destinationPath);
                cb(null, destinationPath);
            } catch (error) {
                cb(error as Error, destinationPath);
            }
        },
        filename(_req, file, cb) {
            const ext = path.extname(file.originalname);
            const filename = `${uuidv4()}${ext}`;
            cb(null, filename);
        },
    });
}

const IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const VIDEO_MIME_TYPES = ['video/mp4', 'video/webm'];

function imageFileFilter(_req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
    if (IMAGE_MIME_TYPES.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed (jpeg, png, webp)'));
    }
}

function videoFileFilter(_req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
    if (VIDEO_MIME_TYPES.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only video files are allowed (mp4, webm)'));
    }
}

export function createImageUpload(category: UploadCategory) {
    return multer({
        storage: createStorage(category),
        fileFilter: imageFileFilter,
        limits: {
            fileSize: 10 * 1024 * 1024, // 10MB
        },
    });
}

export function createVideoUpload(category: UploadCategory) {
    return multer({
        storage: createStorage(category),
        fileFilter: videoFileFilter,
        limits: {
            fileSize: 100 * 1024 * 1024, // 100MB
        },
    });
}

