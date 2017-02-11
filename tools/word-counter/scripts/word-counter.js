 // https://github.com/regexhq/whitespace-regex/blob/master/index.js
var whitespaceRegex = /[\s\f\n\r\t\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000\ufeff\x09\x0a\x0b\x0c\x0d\x20\xa0]/g

// https://github.com/regexhq/word-regex/blob/master/index.js
var wordRegex =  /[a-zA-Z0-9_\u0392-\u03c9\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|\w+/g

var sentenceRegex = /\w[.?!](\s|$)/
var paragraphRegex = /[\r\n\t]+/
var wordsPerMinute = 275

new Vue({
  el: '#app',
  data: {
    input: '',
    topKeywords: []
  },
  computed: {
    chars: function () {
      return this.input.length
    },
    words: function () {      
      return this.count(wordRegex)
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
    },
    readablityIndex: function() {
      return Math.ceil(automatedReadability(
        {
          sentence: this.sentences,
          word: this.words,
          character: this.chars - this.whitespaces
        }
      ))
    },
    suitableFor: function () {
      // https://en.wikipedia.org/wiki/Automated_readability_index
      
      var indexMap = [
        'Age: 5-6	Kindergarten',
        'Age: 6-7	First Grade',
        'Age: 7-8	Second Grade',
        'Age: 8-9	Third Grade',
        'Age: 9-10	Fourth Grade',
        'Age: 10-11	Fifth Grade',
        'Age: 11-12	Sixth Grade',
        'Age: 12-13	Seventh Grade',
        'Age: 13-14	Eighth Grade',
        'Age: 14-15	Ninth Grade',
        'Age: 15-16	Tenth Grade',
        'Age: 16-17	Eleventh grade',
        'Age: 17-18	Twelfth grade',
        'Age: 18-22	College'
      ]
      var index = this.readablityIndex
      if(index < 1) index = 1
      if(index > 14) index = 14

      return indexMap[index - 1]
    }
  },
  methods: {
    update: function (e) {
      this.input = e.target.value
      this.topKeywords = this.findTopKeywords(e.target.value)
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
    },
    findTopKeywords: function(text) {
      var words = text.match(wordRegex)
      var keywordsMap = {}
      words.forEach(function (word) {
        word = word.toLowerCase()
        if(word.length > 0 && !keywordsMap[word]) keywordsMap[word] = 0
        
        keywordsMap[word]++
      })

      // convert from map to array
      var keywordsArray = []
      for(var key in keywordsMap) {
        if (keywordsMap.hasOwnProperty(key)) {
          keywordsArray.push({word: key, count: keywordsMap[key]})
        }
      }

      var sortedArray = keywordsArray.sort(function(a, b) { return b.count - a.count })

      var topKeywords = []

      sortedArray.forEach(function (entity) {
        if(stopWords.indexOf(entity.word) < 0 && topKeywords.length < 6) {
          topKeywords.push(entity)
        }
      })

      return topKeywords
    }
  }
})