function el(id) { return document.getElementById(id); } // Get elem by ID

var canvas = el("canvas");
var context = canvas.getContext("2d");
var colorThief = new ColorThief();

function readImage() {
  if (this.files && this.files[0]) {
    loadImage(this.files[0]);
  }
}

function loadImage (src) {
  var filetype = src.type;
  //	Prevent any non-image file type from being read.
  if (!filetype.match(/image.*/)) {
    alert("The dropped file is not an image: ", filetype);
    return;
  }

  el("load-prompt").innerHTML = "Loading...";

  var FR = new FileReader();
  FR.onload = function (e) {
    var img = new Image();
    img.onload = function () {
      var containerWidth = el("canvas-container").offsetWidth;
      //console.log("Container Width: " + containerWidth);
      if (img.naturalWidth > containerWidth) {
        img.height = containerWidth * (img.height / img.width);
        img.width = containerWidth;
      }
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0, img.width, img.height);
      el("click-target").style.display = 'none';
      el("canvas").style.display = 'block';

      // load color palette
      var palette = colorThief.getPalette(img);
      var ul = document.getElementById("palette-list");
      for(var i = 0; i < palette.length; i++) {
        
        var bgcolor = tinycolor("rgb("+palette[i][0] + "," + palette[i][1] + "," + palette[i][2] + ")").toHexString();
        var li = document.createElement("li");
        var div = document.createElement("div");
        div.className = 'color-shade'
        div.style.backgroundColor = bgcolor;
        div.innerHTML = bgcolor.toUpperCase();        
        div.addEventListener('click', copy);

        li.appendChild(div);
        var a = document.createElement("a");
        a.href = "/color-converter/" + bgcolor;
        a.target = "_blank"; 
        a.innerHTML = bgcolor;
        li.appendChild(a);
        ul.appendChild(li);

      }
      el("result-area").style.display = "block";
    };
    img.src = e.target.result;
  };
  FR.readAsDataURL(src);
}

el("fileUpload").addEventListener("change", readImage, false);

var target = el("drop-target");
target.addEventListener("dragover", function (e) { e.preventDefault(); }, true);
target.addEventListener("drop", function (e) {
  e.preventDefault();
  loadImage(e.dataTransfer.files[0]);
}, true);

function copy (event) {
    var range = document.createRange();
    var selection = window.getSelection();
    selection.removeAllRanges()

    range.selectNodeContents(event.target);
    selection.addRange(range);
    // Copy the selection to clipboard.
    document.execCommand('copy')

    swal({
      title: "Copied!",
      text: "<strong>" + event.target.innerHTML + "</strong>",
      timer: 3000,
      showConfirmButton: true,
      html: true
    });
  }