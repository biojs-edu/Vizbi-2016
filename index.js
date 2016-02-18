var Reveal = require('reveal');
var chartFactory = require('./js/chartFactory.js');

// Full list of configuration options available here: 
// https://github.com/hakimel/reveal.js#configuration 
Reveal.initialize({
  controls: true,
  progress: true,
  history: true,
  center: true,
  // default/cube/page/concave/zoom/linear/fade/none 
  transition: 'none'
});

//Bind Events
Reveal.addEventListener( 'slidechanged', chartFactory.slideChange);
Reveal.addEventListener( 'ready', chartFactory.slideChange);