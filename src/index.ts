import app from './App';
import CONFIG from './config/config';
import './config/db';

const { PORT } = CONFIG;

app.listen(PORT, () => {
    console.log(PORT)
    return console.log(`Server is listening on ${PORT}`);
  });
