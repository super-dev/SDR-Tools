/** Image Cropper Logic **/
var cropper = null;

function el(id){return document.getElementById(id);} // Get elem by ID

el("select-all").addEventListener('click', select_all);

el("jpg-download").addEventListener('click', download_jpg);
el("png-download").addEventListener('click', download_png);

var target = el("drop-target");
target.addEventListener("dragover", function(e){e.preventDefault();}, true);
target.addEventListener("drop", function(e){
	e.preventDefault();
	loadImage(e.dataTransfer.files[0]);
}, true);

el("fileUpload").addEventListener("change", readImage, false);

var rad = document.aspectform.aspectratio;
for(var i = 0; i < rad.length; i++) {
    rad[i].onclick = function() {
        if(cropper != null) {
					var cropper_data = cropper.getData();
          if(this.value == "16:9") {
            cropper.setAspectRatio(16/9);
						cropper.setData({'x':cropper_data.x, 'y':cropper_data.y});
          }
          else if (this.value == "4:3") {
            cropper.setAspectRatio(4/3);
						cropper.setData({'x':cropper_data.x, 'y':cropper_data.y});
          }
          else  {
            cropper.setAspectRatio(NaN);
						free_mode_data(cropper);
          }
        }
    };
}

// Read image from input field
function readImage() {
    if ( this.files && this.files[0] ) {
        loadImage(this.files[0]);
    }
}

function loadImage(src){
	//	Prevent any non-image file type from being read.
	if(!src.type.match(/image.*/)){
		alert("The dropped file is not an image: ", src.type);
		return;
	}
  el("load-prompt").innerHTML = "Loading...";

	//	Create our FileReader and run the results through the render function.
	var reader = new FileReader();
	reader.onload = function(e){
		render(e.target.result);
	};
	reader.readAsDataURL(src);
}
function render(src){
	var image =   el("myimage");
	image.onload = function(){
    // hide click target
    el("click-target").style.display = 'none';

		var scale = 1;
		if(image.naturalWidth > 800) {
			scale = 800.0/image.naturalWidth;
			image.width = 800;
		}

    cropper = new Cropper(el('myimage'), {
			zoomOnWheel: false,
			built: function() {
				this.cropper.scaleX(scale);
				this.cropper.scaleY(scale);
				this.cropper.zoomTo(1);
				free_mode_data(this.cropper);
			},
      crop: function(data) {
				el('img-height').innerHTML = data.height;
				el('img-width').innerHTML = data.width;
      }
    });
	};
	image.src = src;
}

function free_mode_data(cropper) {
	var cropper_data = cropper.getData();
	var c_height = 350;
	if(c_height > cropper_data.height) {
		c_height = cropper_data.height;
	}
	cropper.setData({'x':0, 'y':0, 'width':cropper_data.width, 'height':c_height});
}


function select_all() {
	var container_data = cropper.getContainerData();
	cropper.setAspectRatio(NaN);
	cropper.setData({'x':0, 'y':0, 'width':container_data.width, 'height':container_data.height});
}

function download_jpg() {
	if(cropper != null) {
		var canv = cropper.getCroppedCanvas();
		window.open(canv.toDataURL("image/jpeg", 0.9));
	}
}

function download_png() {
	if(cropper != null) {
		var canv = cropper.getCroppedCanvas();
		window.open(canv.toDataURL());
	}
}
