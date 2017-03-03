new Vue({
  el: '#app',
  data: function() {
    return {
      bodyText: 'Text on Image',
      backgroundType: 'color',
      font: 'sans-serif',
      position: 'center-middle',
      backgroundColor: '#9b4ec7',      
      primaryColor: '#ae81bf',
      secondaryColor: '#7e8a9b',
    }
  },
  mounted: function() {
    this.refreshCanvas()
    // Refresh canvas if any of the data property changes
    for (var k in this.$data) {
      if (this.$data.hasOwnProperty(k)) {
        this.$watch(k, this.refreshCanvas);
      }
    }
  },
  methods: {
    randomColor: function () {
      return tinycolor.random().toHexString()
    },
    backgroundFromColor: function(color) {
      return 'background-color: ' + color;
    },
    refreshCanvas: function() {
      // Get canvas context
      var canvas = this.$refs.canvasElement
      var ctx = canvas.getContext("2d")
      var width = canvas.width
      var height = canvas.height

      // Clear the canvas with the defined background
      if(this.backgroundType === 'color') {
        ctx.fillStyle = this.backgroundColor;        
        ctx.fillRect(0,0,canvas.width,canvas.height)
      }
      else if(this.backgroundType === 'gradient') {
        var grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        grd.addColorStop(0, this.primaryColor);
        grd.addColorStop(1, this.secondaryColor);
        ctx.fillStyle = grd       
        ctx.fillRect(0,0,canvas.width,canvas.height)
      }
      //opacity layer
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = "black";
      ctx.fillRect(-10,-10,820,540);
      ctx.globalAlpha = 1.0;
      ctx.fillStyle = "white";
      ctx.shadowColor = "black";
      ctx.shadowOffsetX = 5; 
      ctx.shadowOffsetY = 5; 
      ctx.shadowBlur = 7;
      ctx.textBaseline = 'top';
      ctx.scale(1,1);
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#ffffff';
      var options = {
        textAlign: this.position.split('-')[0],
        verticalAlign: this.position.split('-')[1],
        lineHeight: 1.3,
        paddingX: 40,
        paddingY: 40,
        font: "bold 48px " + this.font,
        strokeText: false
      }
      CanvasTextWrapper(canvas, this.bodyText, options);
    }
  }
})