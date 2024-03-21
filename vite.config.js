import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const defaultConfig = {
  plugins: [react()],
};

export default defineConfig(({ command, mode }) => {
  const isDev = mode === 'development';

  if (command === 'serve' && isDev) {
    // Mở rộng cấu hình mặc định với cấu hình proxy cho development mode
    return {
      ...defaultConfig,
      server: {
        proxy: {
          '/api': {
            target: 'https://public.kiotapi.com',
            rewrite: path => path.replace(/^\/api/, ''),
            changeOrigin: true, // Luôn true để tránh vấn đề với CORS

          }
        }
      }
    };
  } else {
    // Trả về cấu hình mặc định nếu không phải là development mode hoặc command không phải là 'serve'
    return defaultConfig;
  }
});
