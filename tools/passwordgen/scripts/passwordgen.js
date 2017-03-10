new Vue({
  el: '#app',
  data() {
    return {
      password: '',
      type: 'strong',
      length: 15
    }
  },
  computed: {
    password: function() {
      if(this.length >= 1) {
        return this.generate()
      }
      else {
        return ""
      }
    }
  },
  methods: {
    generate: function() {
      switch(this.type) {
        case 'strong':
          return passhelp.character(this.length, passhelp.alphabets.full_friendly);
        break;
        case 'alphanumeric':
          return passhelp.character(this.length, passhelp.alphabets.alphanumeric, true);
        break;
        case 'phrase':
          return passhelp.phrase(this.length);
        break;
        case 'phrase_special_chars':
          return passhelp.phrase(this.length, true);
        break;
      }
    },
    copy: function() {

    },
  }
})