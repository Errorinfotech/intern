import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import react from '@vitejs/plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const htmlFiles = fs.readdirSync(__dirname)
    .filter(file => file.endsWith('.html'))
    .reduce((acc, file) => {
        const name = file.replace('.html', '');
        acc[name] = resolve(__dirname, file);
        return acc;
    }, {});

export default defineConfig({
    root: './',
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(__dirname, './')
        }
    },
    server: {
        port: 3000,
        strictPort: true,
        host: true,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:5002',
                changeOrigin: true,
                secure: false,
            },
        },
    },
    build: {
        rollupOptions: {
            input: htmlFiles,
        },
    },
});
