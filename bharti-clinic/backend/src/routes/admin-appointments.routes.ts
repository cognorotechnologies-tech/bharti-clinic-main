import { Router } from 'express';
import { verifyToken } from '../middleware/auth';
import * as adminAppointmentController from '../controllers/admin-appointment.controller';

const router = Router();

router.use(verifyToken);

router.get('/', adminAppointmentController.getAdminAppointments);
router.get('/:id', adminAppointmentController.getAdminAppointment);
router.patch('/:id/status', adminAppointmentController.updateAdminAppointmentStatus);
router.delete('/:id', adminAppointmentController.deleteAdminAppointment);

export default router;
