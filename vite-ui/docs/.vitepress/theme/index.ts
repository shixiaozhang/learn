import DefaultTheme from 'vitepress/theme'
import SmartyUI from '../../../src/entry'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    ctx.app.use(SmartyUI)
  },
}
