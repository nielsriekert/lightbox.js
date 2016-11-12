Another LightBox
===

[An example][example]

Getting started
---

### Step 1: Download
[Download lightbox.min.js][download-js].
[Download lightbox.min.css][download-css].

### Step 2: Include files

```html
<!-- Include lightbox.js -->
<script src="/path/to/lightbox.min.js"></script>

<!-- Include the styles -->
<script src="/path/to/lightbox.min.css"></script>

<!-- Create a container (optional) element and anchor elements as sources. -->
<div id="gallery">
  <a href="path/to/image-large-01.jpg"><img src="path/to/image-small-01.jpg" /></a>
  <a href="path/to/image-large-02.jpg"><img src="path/to/image-small-02.jpg" /></a>
  <a href="path/to/image-large-03.jpg"><img src="path/to/image-small-03.jpg" /></a>
</div>
```

### Step 3: Create a new `LightBox` object, passing anchor elements

```javascript
window.addEventListener('load', function(){
  var lightBox = new LightBox(document.querySelectorAll('#gallery a'));
});
```

[download-js]: https://github.com/nielsriekert/lightbox.js/tree/master/lightbox.min.js
[download-css]: https://github.com/nielsriekert/lightbox.js/tree/master/lightbox.min.css
[example]: http://dev.judolosser.nl/fotoalbum/avondvierdaagse/
