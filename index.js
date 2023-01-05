const express = require('express');
const routerApi = require('./routes')
const app = express();
const cors = require('cors')
const port = 3030;
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler')
app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.co']
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No tienes acceso'));
    }
  }
}
app.use(cors(options));

app.listen(port, () => {
  console.log('Mi port' + port)
});

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
