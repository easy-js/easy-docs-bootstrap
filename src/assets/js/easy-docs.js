/*!
 * easy-docs.js
 * 
 * Copyright (c) 2014
 */

/* -----------------------------------------------------------------------------
 * easy-docs
 * ---------------------------------------------------------------------------*/

;(function () {

// Highlight.js
$('pre code').each(function(i, e) {
  hljs.highlightBlock(e);
});

// ScrollSpy
$('body').scrollspy({
  target: '.sidebar'
});

// Update ScrollSpy on Resize
$( window ).resize(function() {
  $('body').scrollspy('refresh');
});

})();