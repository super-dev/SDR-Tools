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
    gradient: function() {
      return 'background:  linear-gradient(' + this.direction + 'deg, ' + this.primaryColor + ' 0%, ' + this.secondaryColor + ' 100%)'
    }
  },
  mounted: function() {
  }
})