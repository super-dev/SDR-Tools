new Vue({
  el: '#app',
  data: {
    color: '#fafafa',
    selectedIndex: -1
  },
  computed: {
    previewStyleIn: function () {
      var color = this.color
      if(this.color.length == 0) {
        color = "#fafafa"
      }
      
      return "background-color: " + tinycolor(color).toRgbString() + ";"
    },
    previewStyleOut: function () {
      return this.shadesMonochrome[this.selectedIndex]
    },
    colorOut: function() {
      var color = tinycolor(this.shadesMonochrome[this.selectedIndex])
      return {
        hex: color.toHexString(),
        rgb:  color.toRgbString(),
        hsl: color.toHslString()
      }
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
  },
  methods: {
    copy: function(text) {
      swal({
        title: "Copied!",
        text: "Copied to clipboard: <strong>" + text + "</strong>",
        timer: 4000,
        showConfirmButton: true,
        html: true
      });
    }
  }
})