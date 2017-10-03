function LightBox(aElements, options){
	if(aElements.nodeName === 'A') {
		this.aElements = [aElements];
	}
	else if(aElements.length) {
		this.aElements = [].slice.call(aElements);
	}
	else {
		return;
	}

	//default options
	this.options = {
		'temp' : ''
	};

	//voeg input opties samen met default opties
	for(var attrname in options){ this.options[attrname] = options[attrname];}

	this.currentaElement = false;//reference to the current link element
	this.currentImgElement = false;//reference to the current lightbox element (for nog an img)
	this.lightBoxStatus = 'unloaded';

	//bind
	this.openViewer = this.openViewer.bind(this);
	this.nextItem = this.nextItem.bind(this);
	this.previousItem = this.previousItem.bind(this);
	this.deactivateViewer = this.deactivateViewer.bind(this);

	//create lightbox containerelement
	this.viewerElement = document.createElement('div');
	this.viewerElement.setAttribute('class', 'lightbox-viewer');
	this.viewerElement.addEventListener('click', function(e){
		if(e.target == this.viewerElement){
			this.deactivateViewer();
		}
	}.bind(this), true);

	if(this.aElements.length > 1){
		var nextElement = document.createElement('button');
		nextElement.setAttribute('type', 'button');
		nextElement.setAttribute('class', 'lightbox-viewer-button-next');
		nextElement.addEventListener('click', this.nextItem);


		var prevElement = document.createElement('button');
		prevElement.setAttribute('type', 'button');
		prevElement.setAttribute('class', 'lightbox-viewer-button-previous');
		prevElement.addEventListener('click', this.previousItem);

		this.viewerElement.appendChild(nextElement);
		this.viewerElement.appendChild(prevElement);

		document.addEventListener('keydown', this.nextItem);
		document.addEventListener('keydown', this.previousItem);
	}

	var closeElement = document.createElement('button');
	closeElement.setAttribute('type', 'button');
	closeElement.setAttribute('class', 'lightbox-viewer-button-close');
	closeElement.addEventListener('click', this.deactivateViewer);

	this.viewerElement.appendChild(closeElement);

	document.addEventListener('keydown', function(e){
		if(e.keyCode == 27){
			this.deactivateViewer();
		}
	}.bind(this));

	document.body.appendChild(this.viewerElement);

	for(var i=0;i<this.aElements.length;i++){
		this.aElements[i].addEventListener('click', this.openViewer);
	}
}

LightBox.prototype.openViewer = function(event){
	try {//try if the event target is from one of the aElements
		if(event && event.target){
			event.preventDefault();
			var target = event.target;
			while(target.nodeName != 'A' && target){
				target = target.parentNode;
			}

			if(this.aElements.indexOf(target) >= 0){
				this.currentaElement = target;
			}
			else {
				throw "not found";
			}
		}
		else {
			throw "no target";
		}
	}
	catch(event){
		this.currentaElement = this.aElements[0];
	}

	if(this.currentaElement){
		this.lightBoxStatus = 'loaded';
		this.updateStatus();
	}
};

LightBox.prototype.activateViewer = function(){
	if(!this.currentaElement || !this.currentaElement.getAttribute('href')){
		return;
	}
};

LightBox.prototype.deactivateViewer = function(){
	/*if(e.target != this.viewerElement && e.keyCode != 27){
		return false;
	}*/

	this.lightBoxStatus = 'unloaded';
	delete this.currentaElement;
	this.viewerElement.classList.remove('is-active');
};

LightBox.prototype.nextItem = function(e){
	if(e.type == 'keydown' && e.keyCode != 39){return;}
	if(this.lightBoxStatus === 'unloaded'){
		return;
	}

	var index = this.aElements.indexOf(this.currentaElement);

	if(index < this.aElements.length - 1){
		this.currentaElement = this.aElements[index + 1];
	}
	else if(this.aElements.length == index + 1){
		this.currentaElement = this.aElements[0];
	}
	this.updateStatus();
};

LightBox.prototype.previousItem = function(e){
	if(e.type == 'keydown' && e.keyCode != 37){return;}
	if(this.lightBoxStatus === 'unloaded'){
		return;
	}

	var index = this.aElements.indexOf(this.currentaElement);

	if(index > 0){
		this.currentaElement = this.aElements[index - 1];
	}
	else if(0 === index){
		this.currentaElement = this.aElements[this.aElements.length - 1];
	}

	this.updateStatus();
};

LightBox.prototype.updateStatus = function(){
	if(!this.currentaElement || !this.currentaElement.getAttribute('href')){
		return;
	}

	if(this.currentImgElement){
		this.currentImgElement.parentNode.removeChild(this.currentImgElement);
	}

	this.currentImgElement = document.createElement('img');
	this.currentImgElement.classList.add('is-unloaded');
	this.currentImgElement.classList.add('lightbox-image-current');
	
	this.currentImgElement.addEventListener('load', function(event){
		this.viewerElement.classList.remove('is-loading');
		event.target.classList.remove('is-unloaded');
	}.bind(this));

	this.currentImgElement.setAttribute('src', this.currentaElement.getAttribute('href'));
	this.viewerElement.classList.add('is-loading');
	this.viewerElement.appendChild(this.currentImgElement);

	this.viewerElement.classList.add('is-active');
};