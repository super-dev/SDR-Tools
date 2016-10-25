function el(id) { return document.getElementById(id); } // Get elem by ID

var canvas = el("canvas");
var context = canvas.getContext("2d");


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

      // load data uri in text area
      if (filetype === 'image/png') {
        el("base64-out").value = canvas.toDataURL();
      } else {
        el("base64-out").value = canvas.toDataURL("image/jpeg", 1.0);
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