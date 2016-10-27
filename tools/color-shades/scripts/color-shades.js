new Vue({
  el: '#app',
  data: {
    color: '#fafafa'
  },
  computed: {
    previewStyle: function () {
      var color = this.color
      if(this.color.length == 0) {
        color = "#fafafa"
      }
      
      return "background-color: " + tinycolor(color).toRgbString() + ";"
    },
    shadesMonochrome: function() {
      var shades = []
      var color = this.color
      if(this.color.length == 0) {
        color = "#fafafa"
      }
      var hsl = tinycolor(color).toHsl()
      for(var i = 9.5; i >= 0.5; i-=1) {
        hsl.l = 0.1 * i;
        shades.push("background-color: " + tinycolor(hsl).toRgbString())
      }
      return shades
    }
  }
})