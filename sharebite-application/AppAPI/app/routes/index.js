import postDataRoutes from './postDataRoutes.js';
import userDataRoutes from './user-data-routes.js';
import certificateRoutes from './certificateRoutes.js';
import eventDataRoutes from './eventDataRoutes.js';
import eventRegister from './eventRegisterRoutes.js';
import subscriberRoutes from './subscriberRoutes.js';
import graphicalDataRoutes from './graphicalDataRoutes.js';
import contactUsRoutes from './contactUsRoutes.js';

const initializeRoutes = (app) => {
  app.use('/medias', postDataRoutes);
  app.use('/users', userDataRoutes);
  app.use('/certificates', certificateRoutes);
  app.use('/', eventDataRoutes);
  app.use('/eventRegister', eventRegister);
  app.use('/subscribers', subscriberRoutes);
  app.use('/graphicalDatas', graphicalDataRoutes);
  app.use('/contactUs', contactUsRoutes);
}

export default initializeRoutes;