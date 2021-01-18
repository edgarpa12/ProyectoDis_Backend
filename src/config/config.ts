import * as dotenv from 'dotenv';

dotenv.config();

export default {
  APP: process.env.APP || 'development',
  PORT: process.env.PORT || '3000',

  DB_DIALECT: process.env.DB_DIALECT || 'mongo',
  DB_HOST: process.env.DB_HOST || 'mongodb+srv://edgarpa12:edgarpa12@cluster0.xh7ci.mongodb.net/main?retryWrites=true&w=majority',
  DB_NAME: process.env.DB_NAME || 'main'
};
