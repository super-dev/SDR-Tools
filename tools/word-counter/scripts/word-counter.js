 // https://github.com/regexhq/whitespace-regex/blob/master/index.js
var whitespaceRegex = /[\s\f\n\r\t\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000\ufeff\x09\x0a\x0b\x0c\x0d\x20\xa0]/g
var sentenceRegex = /\w[.?!](\s|$)/
var paragraphRegex = /[\r\n\t]+/
var wordsPerMinute = 275

new Vue({
  el: '#app',
  data: {
    input: ''
  },
  computed: {
    chars: function () {
      return this.input.length
    },
    words: function () {      
      return this.splitCount(whitespaceRegex)
    },
    sentences: function () {
      return this.splitCount(sentenceRegex)
    },
    paragraphs: function () {
      return this.splitCount(paragraphRegex)
    },
    whitespaces: function () {
      return this.count(whitespaceRegex)
    },
    readingTime: function () {
      var time = (this.words * 1.0) / wordsPerMinute
      var minutes = Math.floor(time)
      var seconds = (time - minutes) * 60
      return minutes + "m " + Math.ceil(seconds) + "s"
    }
  },
  methods: {
    update: function (e) {
      this.input = e.target.value.trim()
    },
    count: function(regex) {
      if(this.input.length != 0) {
        var matches = this.input.match(regex)
        if(matches) return matches.length
      }

      return 0
    },
    splitCount: function(regex) {
      var entities = this.input.split(regex)
      var count = 0;
      for(var i = 0; i < entities.length; i++) {
        if(entities[i].length != 0) count ++
      }

      return count
    }
  }
})