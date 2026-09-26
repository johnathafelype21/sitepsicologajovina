import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      {
        name: 'photo-upload-handler',
        configureServer(server) {
          server.middlewares.use('/api/upload-photo', (req, res) => {
            if (req.method === 'POST') {
              const url = new URL(req.url || '', 'http://localhost:3000');
              const target = url.searchParams.get('target'); // 'office' or 'books'
              const baseName = target === 'office' ? 'jovina-principal-escritorio' : 'jovina-metodo-livros';
              const targetDir = path.resolve(__dirname, 'public/images/jovina');
              if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
              }
              const filePath = path.join(targetDir, `${baseName}.jpg`);
              const fileStream = fs.createWriteStream(filePath);
              req.pipe(fileStream);
              fileStream.on('finish', () => {
                // Convert to webp
                exec(`ffmpeg -i "${filePath}" -q:v 85 -y "${path.join(targetDir, `${baseName}.webp`)}" 2>/dev/null`, () => {
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ success: true, url: `/images/jovina/${baseName}.jpg?t=${Date.now()}` }));
                });
              });
              fileStream.on('error', (err) => {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
              });
              return;
            }
            res.writeHead(405).end();
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
