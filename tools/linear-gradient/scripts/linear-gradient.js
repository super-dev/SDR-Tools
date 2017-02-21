new Vue({
  el: '#app',
  data() {
    return {
      primaryColor: '#0224ab',      
      secondaryColor: '#fad0c4',
      direction: 0
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
      return 'background:  linear-gradient(' + this.direction + 'deg, ' + this.primaryColor + ' 0%, ' + this.secondaryColor + ' 100%)'
    }
  },
  methods: {
    randomPrimary: function () {
      this.primaryColor = tinycolor.random().toHexString()
    },    
    randomSecondary: function () {
      this.secondaryColor = tinycolor.random().toHexString()
    }
  },  
  mounted: function () {
    var primary = tinycolor.random()
    this.primaryColor = primary.toHexString()
    this.secondaryColor = primary.complement().toHexString()

    var options = this.$refs.directionSelect.options.length
    this.direction = this.$refs.directionSelect.options[Math.floor(Math.random() * options)].value
  }
})