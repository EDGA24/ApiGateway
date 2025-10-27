import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});


app.get('/', (req, res) => {
  res.json({
    message: 'API Gateway funcionando',
    version: '1.0.0'
  });
});


const userProxy = createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
  timeout: 60000, // 60 segundos
  proxyTimeout: 60000,
  pathRewrite: {
    '^/api/users': '/api'
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err.message);
    res.status(500).json({
      error: 'Service unavailable',
      details: err.message
    });
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log(`Proxying ${req.method} ${req.url}`);
    
   
    if (req.body && (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH')) {
      const bodyData = JSON.stringify(req.body);
      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log(`Response: ${proxyRes.statusCode}`);
  }
});

app.use('/api/users', userProxy);

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});

export default app;