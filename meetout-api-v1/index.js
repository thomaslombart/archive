const server = require('./server');

const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`listening on port ${port}`); // eslint-disable-line no-console
});