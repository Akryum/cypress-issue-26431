const { defineConfig } = require('cypress')
const { devServer } = require('@cypress/vite-dev-server')

module.exports = defineConfig({
  component: {
    devServer (options) {
      return devServer({
        ...options,
      })
    },
    supportFile: 'cypress/support/index.js',
    indexHtmlFile: 'cypress/support/index.html',
  },
})
