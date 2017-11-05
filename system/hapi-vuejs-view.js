import Vue from 'vue'
import VueMarkdown from 'vue-markdown'

import { createRenderer } from 'vue-server-renderer'

const compile = function (src, options) {
  return function (context) {
    Vue.config.silent = true
    const app = new Vue({
      components: {
        VueMarkdown
      },
      template: src,
      data: context
    })
    return createRenderer().renderToStream(app, context)
  }
}

module.exports = {
  compile
}
