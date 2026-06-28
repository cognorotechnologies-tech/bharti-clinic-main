import { Router } from 'express';
import { verifyToken } from '../middleware/auth';
import * as adminTherapyController from '../controllers/admin-therapy.controller';

const router = Router();

router.use(verifyToken);

router.get('/', adminTherapyController.getAdminTherapies);
router.post('/', adminTherapyController.createAdminTherapy);
router.get('/:id', adminTherapyController.getAdminTherapy);
router.put('/:id', adminTherapyController.updateAdminTherapy);
router.delete('/:id', adminTherapyController.deleteAdminTherapy);

export default router;
