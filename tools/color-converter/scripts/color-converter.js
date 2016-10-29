new Vue({
  el: '#app',
  data: {
    color: '#fafafa'
  },
  computed: {
    previewStyleIn: function () {
      var color = this.color
      if (this.color.length == 0) {
        color = "#fafafa"
      }
      
      return "background-color: " + tinycolor(color).toRgbString() + ";"
    },
    colorOut: function () {
      var color = tinycolor(this.color)
      if (this.color.length == 0) {
        color = tinycolor("#fafafa")
      }

      return {
        hex: color.toHexString(),
        rgb: color.toRgbString(),
        hsl: color.toHslString(),
        hsv: color.toHsvString()
      }
    }
  },
  methods: {
    copy: function (text, event) {
      var selection = window.getSelection()
      selection.removeAllRanges()

      event.target.setSelectionRange(0,  event.target.value.length)

      // Copy the selection to clipboard.
      document.execCommand('copy')

      swal({
        title: "Copied!",
        text: "<strong>" + text + "</strong>",
        timer: 3000,
        showConfirmButton: true,
        html: true
      });
    },
    random: function () {
      this.color = tinycolor.random().toHexString()
    }
  },
  created: function () {
    var hash = window.location.hash
    console.log(hash)
    if(hash.length === 0) {
      this.random()
    }
    else {
      this.color = hash
    }
  },
  watch: {
    color: function() {
      var hash = tinycolor(this.color).toHexString().substring(1)
      window.location.hash = '#' + encodeURIComponent(hash)
    }
  }
})