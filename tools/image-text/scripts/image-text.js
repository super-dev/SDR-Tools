new Vue({
  el: '#app',
  data: function() {
    return {
      bodyText: 'Text on Image',
      backgroundType: 'image',
      font: 'serif',
      position: 'center-middle'
    }
  },
  watch: {
    bodyText: function (val) {
      this.refreshCanvas()
    },
    font: function (val) {
      this.refreshCanvas()
    },    
    position: function (val) {
      this.refreshCanvas()
    }
  },
  mounted: function() {
    this.refreshCanvas()
  },
  methods: {
    refreshCanvas: function() {
      // Get canvas context
      var canvas = this.$refs.canvasElement
      var ctx = canvas.getContext("2d")
      var width = canvas.width
      var height = canvas.height

      // Clear the canvas
      ctx.clearRect(0, 0, width, height);

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
      ctx.textBaseline = 'alphabetic';
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