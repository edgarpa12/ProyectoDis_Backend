
import mongoose from 'mongoose';
import CONFIG from './config';

(<any>mongoose).Promise = global.Promise;
mongoose
  .connect(CONFIG.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    dbName: CONFIG.DB_NAME
  })
  .then(() => {
    console.log('mongodb is connected');
  })
  .catch(error => {
    console.log('mongodb not connected');
    console.log(error);
    process.exit();
  });

  