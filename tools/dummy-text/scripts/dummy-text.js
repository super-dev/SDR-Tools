new Vue({
  el: '#app',
  data() {
    return {
      type: 'plain',
      generator: 'lorem',      
      words: 250,
      paragraphs: 4,
      isArticle: false
    }
  },
  computed: {
    loremText: function() {
      var count = 0
      var text = ''
      var paraStop = Math.ceil(this.words / this.paragraphs)
      var nextStop = paraStop
      var paras = 1;
      var hasList = false
      while(count < this.words && count < 10000) {
        var sentence = ""
        if(paras == 3 && this.isArticle && !hasList) {
          // make 3rd para in an artilce as list
          var lines = []
          
          for(var i = 0; i < 5; i++) {
            if(i == 0) {
              lines[i] = "## " + bytes(Math.floor(Math.random() * 15) + 30).replace('.', '').replace(',', '')
            }
            else {
              lines[i] = "- "+ list()
            }
          }

          sentence = lines.join('\n\n') + "\n\n"
          hasList = true
        }
        else {
          sentence = sentences(1, false, count == 0) + ' '
        }

        text += sentence
        count += sentence.split(' ').length

        if(count > nextStop) {
          text += '\n\n'
          nextStop += paraStop
          paras++
        }
      }

      text += ''

      if(this.isArticle) {
        // add a title
        var title = bytes(Math.floor(Math.random() * 40) + 40).replace('.', '').replace(',', '')
        text = "# " + title + '\n\n' + text
      }
      
      if(this.generator === 'blocks') {
        text = text.replace(/[^\s]/g, "▅")
      }

      var markdown = marked(text, { sanitize: false })
      return {
        plain: markdown,
        markdown: text,
        html: html_beautify(markdown, {
          'extra_liners': ['p', 'h2', 'ul'],
          'wrap_line_length': 0,
        })
      }
    }
  },
  watch: {
    // whenever lorem text changes, this function will run
    loremText : function (newtext) {
      this.highlight()   
    }
  },
  methods: {
    changeType: function(typeName) {
      this.type = typeName
      this.highlight()
    },
    highlight: function() {
      var t = this
      Vue.nextTick(function() {
        if(t.type == 'markdown') {
          hljs.highlightBlock(t.$refs.markdownCode);
        }
        else if(t.type == 'html') {
          hljs.highlightBlock(t.$refs.htmlCode);
        }
      })
    }
  }
})