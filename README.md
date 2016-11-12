Another LightBox
===

Getting started
---

### Step 1: Download
[Download the latest release][download].

### Step 2: Include files

```html
<!-- Include the lightbox.js library -->
<script src="/path/to/lightbox.js"></script>

<!-- Create a container (optional) element and anchor elements as sources. -->
<div id="gallery">
  <a href="path/to/image-large-01.jpg"><img src="path/to/image-small-01.jpg" /></a>
  <a href="path/to/image-large-02.jpg"><img src="path/to/image-small-02.jpg" /></a>
  <a href="path/to/image-large-03.jpg"><img src="path/to/image-small-03.jpg" /></a>
</div>
```

### Step 3: Create a new `LightBox` object, passing anchor elements.

```javascript
window.addEventListener('load', function(){
  var lightBox = new LightBox(document.querySelectorAll('#gallery a'));
});
```

[download]: https://github.com/nielsriekert/lightbox.js/blob/master/src/lightbox.js
[example]: http://dev.judolosser.nl/fotoalbum/avondvierdaagse/
[feeding-dan-gh]: https://github.com/schlosser/feeding-dan/
