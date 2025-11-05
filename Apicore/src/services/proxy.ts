import { createProxyMiddleware } from 'http-proxy-middleware';

export const userServiceProxy = createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
  pathRewrite: {
    '^/api/users': '/api' 
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).json({
      error: 'Service temporarily unavailable',
      service: 'users'
    });
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log(`Proxying ${req.method} ${req.url} to Users Service`);
  }
});



