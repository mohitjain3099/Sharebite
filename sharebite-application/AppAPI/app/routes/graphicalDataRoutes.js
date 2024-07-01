import express from 'express';
import * as graphicalDataController from '../controllers/graphicalDataController.js';

const router = express.Router();

// Get all graphical data
router.get('/', graphicalDataController.getGraphicalData);
// post graphical data
router.post('/', graphicalDataController.postGraphicalData);
// patch graphical data
router.patch('/:id', graphicalDataController.patchGraphicalData);

export default router;