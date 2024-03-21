import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'https://public.kiotapi.com',
//         changeOrigin: true,
//         rewrite: path => path.replace(/^\/api/, ''),
//       },
//     },
//   },
// });

const defaultConfig = {
  plugins: [react()],
}

export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    const isDev = mode === 'development'

    return {
      ...defaultConfig,
      server: {
        proxy: {
          '/api': {
            target: isDev ? 'https://public.kiotapi.com' : 'https://public.kiotapi.com',
            rewrite: path => path.replace(/^\/api/, ''),
            changeOrigin: isDev,
            secure: !isDev
          }
        }
      }
    }
  } else {
    return defaultConfig
  }
})