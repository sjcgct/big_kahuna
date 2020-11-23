// next.config.js
const withCss = require('@zeit/next-css')
const withPurgeCss = require('next-purgecss')

module.exports = withCss(
  withPurgeCss({
    purgeCss: {
      whitelist: () => ['collapse', 'collapsed', 'show', 'nav-link', 'navbar-brand', 'navbar-expand-lg', 'nav-blink', 'active-link', 'navbar-toggler', 'navbar-light', 'navbar-nav', 'navbar-collapse', 'navbar-toggler-icon', 'navbar-collapse', 'collapsing', /^nav/]
    }
  })
)
