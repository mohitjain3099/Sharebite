import express from 'express';
import {saveCertificateController} from '../controllers/certificateController.js'
import {getCertificateController} from '../controllers/certificateController.js'
import {getCertificateControllerById} from '../controllers/certificateController.js'

// Create express router
const router = express.Router();
router.route('/')
    .post(saveCertificateController)
    .get(getCertificateController);

router.route('/:id')
    .get(getCertificateControllerById);

export default router;