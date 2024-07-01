import express from 'express';
import * as userDataController from '../controllers/userDataController.js';
const router = express.Router();

router.route('/')
    .get(userDataController.getAllUsers)
    .post(userDataController.createNewUser)
    .patch(userDataController.updateUser);

router.route('/:id')
    .get(userDataController.getUserById);

router.route('/checkEmail/:emailId')
    .get(userDataController.doesEmailIdExists);

router.route('/login')
    .post(userDataController.authenticateUser);

router.route('/userCountByRole/:role')
    .get(userDataController.getUserCountByRole);

router.route('/userCountByRole')
    .get(userDataController.getUserCountByRole);


export default router;