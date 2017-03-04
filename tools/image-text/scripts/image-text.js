new Vue({
  el: '#app',
  data: function() {
    return {
      bodyText: 'A quick brown fox jumped over the lazy old dog',
      backgroundType: 'color',
      font: 'sans-serif',
      position: 'center-middle',
      hasShadow: true,
      backgroundColor: '#47998d',      
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
      else {
        //opacity layer
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = "black";
        ctx.fillRect(-10,-10,canvas.width + 10,canvas.height + 10)
        ctx.globalAlpha = 1.0;
      }

      
      ctx.fillStyle = "white";

      if (this.hasShadow) {
        ctx.shadowColor = "#222222";
        ctx.shadowOffsetX = 3; 
        ctx.shadowOffsetY = 3; 
        ctx.shadowBlur = 7;
      }
      else {        
        ctx.shadowColor = "transparent";
      }
      
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
    },
    download: function(isJPG) {
      if(isJPG) {
        downloadImage(this.$refs.canvasElement.toDataURL("image/jpeg", 0.9), 'jpeg')
      }
      else {
        downloadImage(this.$refs.canvasElement.toDataURL(), 'png')
      }
    }
  }
})


function downloadImage(dataURI, type) {
  if (Modernizr.adownload) {
    download(dataURI, "text-on-image." + type, "image/" + type);
  }
  else {
    window.open(dataURI);
  }
}