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
    '/', // 프론트에서 보내는 요청 중 '/proxy'로 시작하는 것만 프록시로 보낼 것이라 가정합니다. 필요에 따라 수정하세요.
    createProxyMiddleware({
      target: 'http://localhost:1111', // 백엔드 서버 주소로 수정하세요.
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