VanilleLightbox
===

[An example][example]

Getting started
---

### Step 1: Download
- [Download vanillelightbox.js][download-js].
- [Download vanillelightbox.css][download-css].

### Step 2: Process files
Rename lightbox.scss -> lightbox.css (current file doesn't contain sass logic)

### Step 3: Include files

```html
<!-- Include vanillelightbox.js -->
<script src="/path/to/vanillelightbox.js"></script>

<!-- Include the styles -->
<link rel="stylesheet" href="/path/to/vanillelightbox.css" />

<!-- Create a container (optional) element and anchor elements as sources. -->
<div id="gallery">
  <a href="path/to/image-large-01.jpg"><img src="path/to/image-small-01.jpg" /></a>
  <a href="path/to/image-large-02.jpg"><img src="path/to/image-small-02.jpg" /></a>
  <a href="path/to/image-large-03.jpg"><img src="path/to/image-small-03.jpg" /></a>
</div>
```

### Step 4: Create a new `VanilleLightbox` object, passing anchor elements

```javascript
window.addEventListener('DOMContentLoaded', function(){
  var vanilleLightbox = new VanilleLightbox(document.querySelectorAll('#gallery a'));
});
```

Methods
---

### openViewer() ###
Opens the lightbox viewer starting with the first element.

```javascript
window.addEventListener('DOMContentLoaded', function(){
  var vanilleLightbox = new VanilleLightbox(document.querySelectorAll('#gallery a'));

  vanilleLightbox.openViewer();
});
```

[download-js]: https://github.com/nielsriekert/vanillelightbox/tree/master/src/vanillelightbox.js
[download-css]: https://github.com/nielsriekert/vanillelightbox/tree/master/src/vanillelightbox.scss
[example]: http://judolosser.nl/fotoalbum/avondvierdaagse/
