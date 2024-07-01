import express from 'express';
import * as contactUsController from '../controllers/contactUsController.js';
const router = express.Router();
// Save contact us
router.route('/')
    .post(contactUsController.saveContactUs)
    .get(contactUsController.getAllContactUs);
export default router;