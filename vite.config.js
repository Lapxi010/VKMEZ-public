import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    server: {
      host: '127.0.0.1',
      port: 3000,
    },
    build: {
        minify: false,
        cssMinify: false,
        rollupOptions: {
            input: {
                home: resolve(__dirname, 'index.html'),
                basic: resolve(__dirname, 'basic/index.html'),
                uikit: resolve(__dirname, 'ui-kit/index.html'),
                editor: resolve(__dirname, 'editor/index.html'),
                catalog: resolve(__dirname, 'catalog/index.html'),
                products: resolve(__dirname, 'products/index.html'),
                product: resolve(__dirname, 'product/index.html'),
                projects: resolve(__dirname, 'projects/index.html'),
                contacts: resolve(__dirname, 'contacts/index.html'),
                production: resolve(__dirname, 'production/index.html'),
                warranty: resolve(__dirname, 'warranty/index.html'),
                polytic: resolve(__dirname, 'polytic/index.html'),
                allcatalog:resolve(__dirname, 'all-catalog/index.html'),
                project: resolve(__dirname, 'project/index.html'),
                automatization: resolve(__dirname, 'automatization/index.html'),
            },
            output: {
                entryFileNames: 'assets/[name].js',
                chunkFileNames: 'assets/[name].js',
                assetFileNames: 'assets/[name][extname]',
            },
        },
    },
});
