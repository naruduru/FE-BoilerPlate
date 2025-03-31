import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    global: 'window', // 혹은 '{}'
  },
  server: {
    host: 'localhost', // 사용하려는 IP 주소로 변경
    port: 3000             // 사용할 포트 번호 (기본값: 3000)
  }
})
