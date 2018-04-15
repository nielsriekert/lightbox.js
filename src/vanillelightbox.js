/*!
 * VanilleLightbox v1.0.2
 * (c) 2016-2018 Niels Riekert
 */
function VanilleLightbox(aElements){
	if(aElements.nodeName === 'A') {
		this.aElements = [aElements];
	}
	else if(aElements.length) {
		this.aElements = [].slice.call(aElements);
	}
	else {
		return;
	}

	this.srcTypes = [
		{
			'regExp' : /\.png$/i,
			'type' : 'image'
		},
		{
			'regExp' : /\.apng$/i,
			'type' : 'image'
		},
		{
			'regExp' : /\.jpe?g$/i,
			'type' : 'image'
		},
		{
			'regExp' : /\.gif$/i,
			'type' : 'image'
		},
		{
			'regExp' : /\.webp$/i,
			'type' : 'image'
		},
		{
			'regExp' : /\.svg$/i,
			'type' : 'image'
		},
		{
			'regExp' : /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i,
			'type' : 'youtube'
		},
	];

	this.srcElements = [];

	for(var i=0;i<this.aElements.length;i++){
		for(var j=0;j<this.srcTypes.length;j++){
			if(this.aElements[i].getAttribute('href').match(this.srcTypes[j].regExp)){
				this.srcElements.push(
					{
						'element' : this.aElements[i],
						'type' : this.srcTypes[j].type,
						'regExp' : this.srcTypes[j].regExp
					}
				);
				break;
			}
		}
	}

	if(this.srcElements.length === 0){
		return;
	}

	this.currentSource = false;//reference to the current link element
	this.currentSourceElement = false;//reference to the current lightbox element (for nog an img)
	this.lightBoxLoaded = false;

	//bind
	this.openViewer = this.openViewer.bind(this);
	this.nextItem = this.nextItem.bind(this);
	this.previousItem = this.previousItem.bind(this);
	this.deactivateViewer = this.deactivateViewer.bind(this);

	//create lightbox containerelement
	this.viewerElement = document.createElement('div');
	this.viewerElement.setAttribute('class', 'vanillelightbox-viewer');
	this.viewerElement.addEventListener('click', function(e){
		if(e.target == this.viewerElement){
			this.deactivateViewer();
		}
	}.bind(this), true);

	if(this.srcElements.length > 1){
		var nextElement = document.createElement('button');
		nextElement.setAttribute('type', 'button');
		nextElement.setAttribute('class', 'vanillelightbox-viewer-button-next');
		nextElement.addEventListener('click', this.nextItem);

		var prevElement = document.createElement('button');
		prevElement.setAttribute('type', 'button');
		prevElement.setAttribute('class', 'vanillelightbox-viewer-button-previous');
		prevElement.addEventListener('click', this.previousItem);

		this.viewerElement.appendChild(nextElement);
		this.viewerElement.appendChild(prevElement);

		document.addEventListener('keydown', function(e){
			switch(e.keyCode){
				case 37:
					this.previousItem();
					break;
				case 39:
					this.nextItem();
					break;
			}
			
		}.bind(this));
	}

	var closeElement = document.createElement('button');
	closeElement.setAttribute('type', 'button');
	closeElement.setAttribute('class', 'vanillelightbox-viewer-button-close');
	closeElement.addEventListener('click', this.deactivateViewer);

	this.viewerElement.appendChild(closeElement);

	document.addEventListener('keydown', function(e){
		if(e.keyCode == 27){
			this.deactivateViewer();
		}
	}.bind(this));

	document.body.appendChild(this.viewerElement);

	for(var i=0;i<this.srcElements.length;i++){
		this.srcElements[i].element.addEventListener('click', this.openViewer);
	}
}

VanilleLightbox.prototype.openViewer = function(event){
	try {//try if the event target is from one of the srcElements
		if(event && event.target){
			event.preventDefault();
			var target = event.target;
			while(target.nodeName != 'A' && target){
				target = target.parentNode;
			}

			var found = false;
			for(var i=0;i<this.srcElements.length;i++){
				if(this.srcElements[i].element == target){
					this.currentSource = this.srcElements[i];
					found = true;
					break;
				}
			}
			if(!found){
				throw "not found";
			}
		}
		else {
			throw "no target";
		}
	}
	catch(event){
		this.currentSource = this.srcElements[0];
	}

	if(this.currentSource){
		this.lightBoxLoaded = true;
		this.updateStatus();
	}
};

VanilleLightbox.prototype.deactivateViewer = function(){
	this.lightBoxLoaded = false;
	delete this.currentSource;
	if(this.currentSourceElement.getAttribute('data-source-type') == 'youtube'){
		this.currentSourceElement.parentNode.removeChild(this.currentSourceElement);
	}
	this.viewerElement.classList.remove('is-active');
};

VanilleLightbox.prototype.nextItem = function(){
	if(this.lightBoxLoaded === false){
		return;
	}

	var index = this.srcElements.indexOf(this.currentSource);

	if(index < this.srcElements.length - 1){
		this.currentSource = this.srcElements[index + 1];
	}
	else if(this.srcElements.length == index + 1){
		this.currentSource = this.srcElements[0];
	}
	this.updateStatus();
};

VanilleLightbox.prototype.previousItem = function(){
	if(this.lightBoxLoaded === false){
		return;
	}

	var index = this.srcElements.indexOf(this.currentSource);

	if(index > 0){
		this.currentSource = this.srcElements[index - 1];
	}
	else if(0 === index){
		this.currentSource = this.srcElements[this.srcElements.length - 1];
	}

	this.updateStatus();
};

VanilleLightbox.prototype.updateStatus = function(){
	if(!this.currentSource || !this.currentSource.element.getAttribute('href')){
		return;
	}

	if(this.currentSourceElement && this.currentSourceElement.parentNode){
		this.currentSourceElement.parentNode.removeChild(this.currentSourceElement);
	}
	
	var src = '';
	switch(this.currentSource.type){
		case 'image':
			this.currentSourceElement = document.createElement('img');
			this.currentSourceElement.classList.add('vanillelightbox-source-image');
			src = this.currentSource.element.getAttribute('href');
			break;
		case 'youtube':
			this.currentSourceElement = document.createElement('iframe');
			this.currentSourceElement.classList.add('vanillelightbox-source-youtube');
			this.currentSourceElement.setAttribute('frameborder', 0);
			this.currentSourceElement.setAttribute('allowfullscreen', 'allowfullscreen');
			src = 'https://www.youtube.com/embed/' + this.currentSource.element.getAttribute('href').match(this.currentSource.regExp)[1];
			break;
	}

	this.currentSourceElement.setAttribute('data-source-type', this.currentSource.type);
	this.currentSourceElement.classList.add('is-unloaded');
	this.currentSourceElement.classList.add('vanillelightbox-source-current');

	this.currentSourceElement.addEventListener('load', function(event){
		this.viewerElement.classList.remove('is-loading');
		event.target.classList.remove('is-unloaded');
	}.bind(this));

	this.currentSourceElement.setAttribute('src', src);
	this.viewerElement.classList.add('is-loading');
	this.viewerElement.appendChild(this.currentSourceElement);

	this.viewerElement.classList.add('is-active');
};