new Vue({
  el: '#app',
  data() {
    return {
      generator: 'lorem',      
      words: 250,
      paragraphs: 4
    }
  },
  computed: {
    loremText: function() {
      var count = 0
      var text = '<p>'
      var paraStop = Math.ceil(this.words / this.paragraphs)
      var nextStop = paraStop
      while(count < this.words && count < 10000) {
        var sentence = sentences(1, false, count == 0)
        text += sentence
        count += sentence.split(' ').length

        if(count > nextStop) {
          text += '</p><p>'
          nextStop += paraStop
        }
        
        console.log(sentence)
        console.log(count)
        console.log(nextStop)
      }

      text += "</p>"

      return text
    }
  }
})