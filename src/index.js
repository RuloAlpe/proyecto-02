import app from './app';
import config from './config/config.dev';

const {
  port,
} = config;

app.listen(port);
console.log(`Server listo! √ en puerto: ${port}`);