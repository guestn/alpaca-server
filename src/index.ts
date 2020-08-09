import './LoadEnv'; // Must be the first import

import app from '@server';
import logger from '@shared/Logger';
import { startWSStream } from './websockets';

// Start the server
const port = Number(process.env.PORT || 9000);

app.listen(port, () => {
  logger.info('Express server started on port: ' + port);
  // startWSStream();
});
