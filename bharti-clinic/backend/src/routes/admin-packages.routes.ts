import { Router } from 'express';
import { verifyToken } from '../middleware/auth';
import * as adminPackageController from '../controllers/admin-package.controller';

const router = Router();

router.use(verifyToken);

router.get('/', adminPackageController.getAdminPackages);
router.post('/', adminPackageController.createAdminPackage);
router.get('/:id', adminPackageController.getAdminPackage);
router.put('/:id', adminPackageController.updateAdminPackage);
router.delete('/:id', adminPackageController.deleteAdminPackage);

export default router;
