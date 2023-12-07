// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app){
//   app.use(
//       createProxyMiddleware('/proxy', {
//           target: 'http://localhost:1111/',
//           changeOrigin: true
//       })
//   )
// };

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/',
    createProxyMiddleware({
      target: 'http://localhost:1111',
      changeOrigin: true,
      onError: (err, req, res) => {
        console.error('Proxy Error:', err);
        res.writeHead(500, {
          'Content-Type': 'text/plain',
        });
        res.end('Something went wrong. Check logs for details.');
      },
    })
  );
};