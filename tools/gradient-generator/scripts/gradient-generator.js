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
        return 'background: radial-gradient(circle at ' + this.position + ', ' + this.primaryColor + ' , ' + this.secondaryColor + ')'
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
    download: function(isJPG) {
      var canvas = document.createElement('canvas')
      canvas.width = 3000
      canvas.height = 2000
      var ctx = canvas.getContext("2d")
      var grd
      if(this.gradientType === 'linear') {
        grd = createLinearGradient(canvas, ctx, this.direction, this.primaryColor, this.secondaryColor)
      }
      else {
        grd = createRadialGradient(canvas, ctx, this.position, this.primaryColor, this.secondaryColor)
      }

      ctx.fillStyle = grd
      ctx.fillRect(0,0,canvas.width,canvas.height)

      if(isJPG) {
        downloadImage(canvas.toDataURL("image/jpeg", 1), 'jpeg')
      }
      else {
        downloadImage(canvas.toDataURL(), 'png')
      }
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

    // setup copy to clipboard
    var clipboard = new Clipboard('.button-copy');

    clipboard.on('success', function(e) {
        e.trigger.innerHTML = "Copied!"
        e.clearSelection()
        setTimeout(function() {
          e.trigger.innerHTML = "Copy"
        }, 1000)
    });

    clipboard.on('error', function(e) {
        console.error('Action:', e.action)
        console.error('Trigger:', e.trigger)
    });
  }
})

function createLinearGradient(canvas, ctx, direction, primaryColor, secondaryColor) {
  var x0, y0, x1, y1
  switch(direction) {
    case '0': // Bottom to Top
      x0 = canvas.width / 2
      y0 = canvas.height
      x1 = canvas.width / 2
      y1 = 0
      break;
    case '45': // Bottom-Left to Top-Right
      x0 = 0
      y0 = canvas.height
      x1 = canvas.width
      y1 = 0
      break;
    case '90': // Left to Right
      x0 = 0
      y0 = canvas.height / 2
      x1 = canvas.width
      y1 = canvas.height / 2
      break;
    case '135': // Top-Left to Bottom-Right
      x0 = 0
      y0 = 0
      x1 = canvas.width
      y1 = canvas.height
      break;
    case '180': // Top to Bottom
      x0 = canvas.width/2
      y0 = 0
      x1 = canvas.width/2
      y1 = canvas.height
      break;
    case '225': // Top-Right to Bottom-Left
      x0 = canvas.width
      y0 = 0
      x1 = 0
      y1 = canvas.height
      break;
    case '270': // Right to Left
      x0 = canvas.width
      y0 = canvas.height / 2
      x1 = 0
      y1 = canvas.height / 2
      break;
    case '315': // Bottom-Right to Top-Left
      x0 = canvas.width
      y0 = canvas.height
      x1 = 0
      y1 = 0
      break;
  }
  var grd = ctx.createLinearGradient(x0, y0, x1, y1);
  grd.addColorStop(0, primaryColor);
  grd.addColorStop(1, secondaryColor);

  return grd
}


function createRadialGradient(canvas, ctx, position, primaryColor, secondaryColor) {
  var x0, y0, r0, x1, y1, r1
  r0 = 0
  var diag = Math.sqrt(canvas.width*canvas.width + canvas.height*canvas.height)
  switch(position) {
    case 'center':
      x0 = canvas.width / 2
      y0 = canvas.height / 2
      x1 = canvas.width / 2
      y1 = canvas.height / 2
      r1 = canvas.height
      break;
    case 'top':
      x0 = canvas.width / 2
      y0 = 0
      x1 = canvas.width / 2
      y1 = 0
      r1 = canvas.width
      break;
    case 'right top':
      x0 = canvas.width
      y0 = 0
      x1 = canvas.width
      y1 = 0
      r1 = diag
      break;
    case 'right':
      x0 = canvas.width
      y0 = canvas.height / 2
      x1 = canvas.width
      y1 = canvas.height / 2
      r1 = canvas.width
      break;
    case 'right bottom':
      x0 = canvas.width
      y0 = canvas.height
      x1 = canvas.width
      y1 = canvas.height
      r1 = diag
      break;
    case 'bottom':
      x0 = canvas.width / 2
      y0 = canvas.height
      x1 = canvas.width / 2
      y1 = canvas.height
      r1 = canvas.width
      break;
    case 'left bottom':
      x0 = 0
      y0 = canvas.height
      x1 = 0
      y1 = canvas.height
      r1 = diag
      break;
    case 'left':
      x0 = 0
      y0 = canvas.height / 2
      x1 = 0
      y1 = canvas.height / 2
      r1 = canvas.width
      break;
    case 'left top':
      x0 = 0
      y0 = 0
      x1 = 0
      y1 = 0
      r1 = diag
      break;
  }

  var grd = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
  grd.addColorStop(0, primaryColor);
  grd.addColorStop(1, secondaryColor);

  return grd
}

function downloadImage(dataURI, type) {
  if (Modernizr.adownload) {
    download(dataURI, "gradient." + type, "image/" + type);
  }
  else {
    window.open(dataURI);
  }
}