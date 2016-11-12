function LightBox(aElements, options){
	this.aElements = [].slice.call(aElements);

	//default options
	this.options = {
		'temp' : ''
	};

	//voeg input opties samen met default opties
	for(var attrname in options){ this.options[attrname] = options[attrname];}

	this.currentaElement = false;
	this.currentImgElement = false;
	this.lightBoxStatus = 'unloaded';
	var _this = this;

	//setup viewer
	//this.bgElement = document.createElement('div');
	//this.bgElement.setAttribute('class', 'lightbox-background');

	this.viewerElement = document.createElement('div');
	this.viewerElement.setAttribute('class', 'lightbox-viewer');
	this.viewerElement.addEventListener('click', function(e){ _this.deactivateViewer(e);}, true);

	if(this.aElements.length > 1){
		var nextElement = document.createElement('button');
		nextElement.setAttribute('type', 'button');
		nextElement.setAttribute('class', 'lightbox-viewer-button-next');
		nextElement.addEventListener('click', function(e){ _this.nextItem(e);});


		var prevElement = document.createElement('button');
		prevElement.setAttribute('type', 'button');
		prevElement.setAttribute('class', 'lightbox-viewer-button-previous');
		prevElement.addEventListener('click', function(e){ _this.previousItem(e);});

		this.viewerElement.appendChild(nextElement);
		this.viewerElement.appendChild(prevElement);

		document.addEventListener('keydown', function(e){_this.nextItem(e);} );
		document.addEventListener('keydown', function(e){_this.previousItem(e);} );
	}

	document.addEventListener('keydown', function(e){_this.deactivateViewer(e);} );

	//document.body.appendChild(this.bgElement);
	document.body.appendChild(this.viewerElement);

	for(var i=0;i<this.aElements.length;i++){
		this.aElements[i].addEventListener('click', function(e){ _this.openViewer(e);});
	}
};

LightBox.prototype.openViewer = function(e){
	if(e.target){
		e.preventDefault();
		var target = e.target;
		while(target.nodeName != 'A' && target){
			target = target.parentNode;
		}

		//wordt niet ondersteund door IE
		if(this.aElements.find(function(aElement){ return aElement == target;})){
			this.currentaElement = target;
		}
	}
	else {
		this.currentaElement = this.aElements[0];
	}
	if(this.currentaElement){
		this.lightBoxStatus = 'loaded';
		this.setItem();
	}
};

LightBox.prototype.activateViewer = function(){
	if(!this.currentaElement || !this.currentaElement.getAttribute('href')){
		return;
	}
};

LightBox.prototype.deactivateViewer = function(e){
	if(e.target != this.viewerElement && e.keyCode != 27){
		return false;
	}

	this.lightBoxStatus = 'unloaded';
	delete this.currentaElement;
	this.viewerElement.classList.remove('is-active');
};

LightBox.prototype.nextItem = function(e){ console.log(e);
	if(e.type == 'keydown' && e.keyCode != 39){return;}
	if(this.lightBoxStatus == 'unloaded'){
		return;
	}

	var index = this.aElements.indexOf(this.currentaElement);

	if(index < this.aElements.length - 1){
		this.currentaElement = this.aElements[index + 1]
	}
	else if(this.aElements.length == index + 1){
		this.currentaElement = this.aElements[0];
	}
	console.log(this.currentaElement);
	this.setItem();
};

LightBox.prototype.previousItem = function(e){
	if(e.type == 'keydown' && e.keyCode != 37){return;}
	if(this.lightBoxStatus == 'unloaded'){
		return;
	}

	var index = this.aElements.indexOf(this.currentaElement);
	console.log(index, this.aElements.length);

	if(index > 0){
		this.currentaElement = this.aElements[index - 1]
	}
	else if(0 == index){console.log(this.aElements.length - 1);
		this.currentaElement = this.aElements[this.aElements.length - 1];
	}

	this.setItem();
};

LightBox.prototype.setItem = function(e){
	if(!this.currentaElement || !this.currentaElement.getAttribute('href')){
		return;
	}

	if(this.currentImgElement){
		this.currentImgElement.parentNode.removeChild(this.currentImgElement);
	}

	this.currentImgElement = document.createElement('img');
	this.currentImgElement.classList.add('is-unloaded', 'lightbox-image-current');
	var _this = this;
	this.currentImgElement.addEventListener('load', function(e){
		_this.viewerElement.classList.remove('is-loading');
		var scaleFactorHeight = window.innerHeight / this.offsetHeight * 0.9;
		var scaleFactorWidth = window.innerWidth / this.offsetWidth * 0.9;
		var scaleFactor = (scaleFactorHeight > scaleFactorWidth)? scaleFactorWidth : scaleFactorHeight; 
		this.setAttribute('style', 'transform: scale(' + scaleFactor + ');');
		this.classList.remove('is-unloaded');
	});
	this.currentImgElement.setAttribute('src', this.currentaElement.getAttribute('href'));
	_this.viewerElement.classList.add('is-loading');
	this.viewerElement.appendChild(this.currentImgElement);

	//this.bgElement.classList.add('is-active');
	this.viewerElement.classList.add('is-active');
}