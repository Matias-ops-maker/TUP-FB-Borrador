import { syncModels } from './models/index.js';

const migrate = async () => {
  await syncModels();
};

migrate();