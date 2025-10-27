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

// Otros microserviios que agregues en el futuro
export const orderServiceProxy = createProxyMiddleware({
  target: 'http://localhost:3002',
  changeOrigin: true,
  pathRewrite: {
    '^/api/orders': '/api'
  }
});

export const productServiceProxy = createProxyMiddleware({
  target: 'http://localhost:3003', 
  changeOrigin: true,
  pathRewrite: {
    '^/api/products': '/api'
  }
});