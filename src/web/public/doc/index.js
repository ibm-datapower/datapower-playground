$(document).ready(function() {
  $.getJSON('toc.json', function(json) {
    (function getNext (api) {
      if (api) {
        $.get('api/'+api+'.markdown', function(data) {
          $("#content").append (data);
          getNext (json.shift());
        });
      } else $.getScript('http://strapdownjs.com/v/0.2/strapdown.js');
    }) (json.shift());
  });
});
