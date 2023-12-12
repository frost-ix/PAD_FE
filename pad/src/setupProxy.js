const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/proxy',
    createProxyMiddleware({
      // target: 'http://1.209.148.143:8800',
      target: 'http://localhost:8800',
      changeOrigin: true,
      onError: (err, req, res) => {
        console.error('Proxy Error:', err);
        res.writeHead(500, {
          'Content-Type': 'text/plain',
        });
        res.end('문제가 발생했습니다. 자세한 내용은 로그를 확인하세요.');
      },
    })
  );
};