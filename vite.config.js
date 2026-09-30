import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
    base: './',
    build: {
        rollupOptions: {
            input: {
                home: resolve(__dirname, 'index.html'),
                projetos: resolve(__dirname, 'projetos.html'),
                cadastro: resolve(__dirname, 'cadastro.html')
            }
        }
    }
});
