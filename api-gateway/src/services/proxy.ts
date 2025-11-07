import { createProxyMiddleware } from 'http-proxy-middleware';

export const userServiceProxy = createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
  pathRewrite: {
    '^/users': '/api'
  }
});

export const authServiceProxy = createProxyMiddleware({
  target: 'http://localhost:3002',
  changeOrigin: true
});
