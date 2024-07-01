import express from 'express';
import * as subscriberController from '../controllers/subscriberController.js';

const router = express.Router();

router.route('/')
    .post(subscriberController.saveSubscriber)//  Save subscriber
    .get(subscriberController.getAllEmails);//  Get all emails

export default router;