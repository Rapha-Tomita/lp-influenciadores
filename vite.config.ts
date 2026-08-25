import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import express from 'express';
import path from 'path';
import {defineConfig, Plugin} from 'vite';
import {createLeadsRouter} from './server/leadsRouter.ts';

function leadsApiPlugin(): Plugin {
  const app = express();
  app.use(express.json({ limit: '32kb' }));
  app.use('/api', createLeadsRouter());

  const handle = (
    req: { url?: string },
    res: unknown,
    next: () => void,
  ) => {
    if (!req.url?.startsWith('/api')) {
      next();
      return;
    }
    app(req as express.Request, res as express.Response, next);
  };

  return {
    name: 'leads-api',
    configureServer(server) {
      server.middlewares.use(handle);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handle);
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), leadsApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
