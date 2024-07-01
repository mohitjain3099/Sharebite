import express from 'express';
import * as postDataController from '../controllers/postDataController.js';
// router for /postData routes
const router = express.Router();
// Routes for routing to the controller functions
router.route('/')
    .post(postDataController.savePostData)
    .get(postDataController.getPostData);
router.route('/:id')
    .patch(postDataController.patchPostData)
    .delete(postDataController.deletePostData);
router.route('/filters')
    .get(postDataController.getFilteredPostData);
export default router;  
