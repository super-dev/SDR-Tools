new Vue({
  el: '#app',
  data() {
    return {
      password: '',
      type: 'strong',
      length: 15,
      unit: 'characters',
      count: 0
    }
  },
  computed: {
    password: function() {
      this.count++ // just used for generating another password via vue dependency
      if(this.length >= 1 && this.count) {
        return this.generate()
      }
      else {
        return ""
      }
    },
    unit: function() {
      if(this.type == 'strong' || this.type == 'alphanumeric')
        return 'characters'
      else
        return 'words'
    }
  },
  watch: {
    type: function() {
      if(this.type == 'strong' || this.type == 'alphanumeric')
        this.length = 15
      else
        this.length = 3
    }
  },
  mounted: function() {    
    // setup copy to clipboard
    var clipboard = new Clipboard('.button-copy');

    clipboard.on('success', function(e) {
        e.trigger.innerHTML = "Copied!"
        e.clearSelection()
        setTimeout(function() {
          e.trigger.innerHTML = "Copy Password"
        }, 1000)
    });

    clipboard.on('error', function(e) {
        console.error('Action:', e.action)
        console.error('Trigger:', e.trigger)
    });
  },
  methods: {
    generate: function() {
      var pass = ''
      switch(this.type) {
        case 'strong':
          pass = passhelp.character(this.length, passhelp.alphabets.full_friendly);
        break;
        case 'alphanumeric':
          pass = passhelp.character(this.length, passhelp.alphabets.alphanumeric, true);
        break;
        case 'phrase':
          pass = passhelp.phrase(this.length);
        break;
        case 'phrase_special_chars':
          pass = passhelp.phrase(this.length, true);
        break;
      }
      return pass
    }
  }
})