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
              lines[i] = "## " + list()
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
        var title = sentences(1).split(',')[0]
        text = "# " + title + '\n\n' + text
      }
      
      if(this.generator === 'blocks') {
        text = text.replace(/[^\s]/g, "▅")
      }

      if(this.type === 'plain') {
        return  marked(text, { sanitize: false })
      }
      else {
        return text.replace(/[\n]+/g, "<br><br>")
      }
    }
  }
})