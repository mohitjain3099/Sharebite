import express from 'express';
import * as eventRegisterController from '../controllers/eventRegisterController.js';
// router for /eventRegister routes
const router = express.Router();
// Routes for routing to the controller functions
router.route('/')
    .post(eventRegisterController.saveEventRegister)
    .get(eventRegisterController.getAllEventRegister);
export default router;