new Vue({
  el: '#editor',
  data: {
    input: '# Markdown Writer\n\nWelcome to SDR Markdown Writer.\n\nYou can refer to [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for writing markdown.'
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.input, { sanitize: true })
    }
  },
  methods: {
    update: _.debounce(function (e) {
      this.input = e.target.value
    }, 300)
  }
})