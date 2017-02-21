new Vue({
  el: '#app',
  data() {
    return {
      primaryColor: '#0224ab',      
      secondaryColor: '#fad0c4',
      gradientType: 'linear',
      direction: 0,
      position: 'top'
    }
  },
  computed: {
    primaryColorBackground: function() {
      return 'background-color: ' + this.primaryColor;
    },
    secondaryColorBackground: function() {
      return 'background-color: ' + this.secondaryColor;
    },
    gradient: function() {
      if(this.gradientType === 'linear') {
        return 'background: linear-gradient(' + this.direction + 'deg, ' + this.primaryColor + ' 0%, ' + this.secondaryColor + ' 100%)'
      }
      else {
        return 'background: radial-gradient(at ' + this.position + ', ' + this.primaryColor + ' , ' + this.secondaryColor + ')'
      }
    }
  },
  methods: {
    randomPrimary: function () {
      this.primaryColor = tinycolor.random().toHexString()
    },    
    randomSecondary: function () {
      this.secondaryColor = tinycolor.random().toHexString()
    },
    copyCode: function() {
      return
    }
  }, 
  watch: {
    // whenever gradient changes, this function will run
    gradient: function (newgradient) {
      var t = this
      Vue.nextTick(function () {
        hljs.highlightBlock(t.$refs.cssCode);
      })      
    }
  },
  mounted: function () {
    var primary = tinycolor.mix(tinycolor.random().saturate(10), tinycolor('#fff'), amount = 50)
    this.primaryColor = primary.toHexString()
    this.secondaryColor = primary.complement().toHexString()

    var options = this.$refs.directionSelect.options.length
    this.direction = this.$refs.directionSelect.options[Math.floor(Math.random() * options)].value

    hljs.initHighlightingOnLoad()
  }
})