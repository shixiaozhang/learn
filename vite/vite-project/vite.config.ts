import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import testHookPlugin from './test-hooks-plugin'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), testHookPlugin()],
})
