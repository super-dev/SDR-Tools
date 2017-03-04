new Vue({
  el: '#app',
  data: function() {
    return {
      bodyText: 'A quick brown fox jumped over the lazy old dog',
      backgroundType: 'gradient',
      font: '',
      fontOptions: [
      ],
      position: 'center-middle',
      hasShadow: true,
      image: '',
      backgroundColor: '#3690bc',      
      primaryColor: '#e86a8d',
      secondaryColor: '#4d669c',
    }
  },
  watch: {
    font: function() {
       var self = this
       WebFont.load({
          google: {
            families: [this.font]
          },
          fontactive: function() {
            self.refreshCanvas()
          }
        });
    }
  },
  created: function() {
    this.fetchGoogleFonts()
  },
  mounted: function() {
    this.refreshCanvas()
    // Refresh canvas if any of the data property changes
    for (var k in this.$data) {
      if (this.$data.hasOwnProperty(k) && k !== 'font') {
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
    fetchGoogleFonts: function() {
      this.fontOptions = []
      var self = this
      axios.get('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAUj9zWFPTFQmZsyXJPcebLA-BJQERnGqc')
        .then(function (response) {
          response.data.items.forEach(function (font) {
            self.fontOptions.push(font.family)
          })
          self.font = self.fontOptions[0]
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    loadImage: function(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (files && files[0]) {
        var file = files[0]
        //	Prevent any non-image file type from being read.
        if (!file.type.match(/image.*/)) {
          alert("The dropped file is not an image: ", file.type);
          return;
        }

        var image = new Image();
        var reader = new FileReader();
        var vm = this;

        reader.onload = (e) => {
          vm.image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
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
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
      else {
        //opacity layer
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = "black";
        ctx.fillRect(-10, -10, canvas.width + 10, canvas.height + 10)
        ctx.globalAlpha = 1.0;
        
        if(this.image) {
          drawImageScaled(this.$refs.loadedImage, ctx);

          // ctx.drawImage(this.$refs.loadedImage, 0, 0, canvas.width, canvas.height);
        }
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

function drawImageScaled(img, ctx) {
   var canvas = ctx.canvas
   var hRatio = canvas.width  / img.naturalWidth
   var vRatio =  canvas.height / img.naturalHeight
   var ratio  = Math.max ( hRatio, vRatio )
   var centerShift_x = ( canvas.width - img.naturalWidth*ratio ) / 2
   var centerShift_y = ( canvas.height - img.naturalHeight*ratio ) / 2
   ctx.drawImage(img, 0,0, img.naturalWidth, img.naturalHeight,
                      centerShift_x,centerShift_y,img.naturalWidth*ratio, img.naturalHeight*ratio)
}