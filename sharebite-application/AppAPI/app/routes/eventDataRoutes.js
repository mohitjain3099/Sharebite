import express from 'express';
import * as eventDataController from '../controllers/eventDataController.js';
// router for /eventData routes
const router = express.Router();
// Routes for routing to the controller functions
router.route('/eventData')
    .post(eventDataController.saveEventData);
router.route('/getAllEventData')
    .get(eventDataController.getAllEventData);
router.route('/getEventFilterData')
    .get(eventDataController.getEventFilterData);
router.route('/patchEventData/:id')
    .patch(eventDataController.updateEventData);
export default router;