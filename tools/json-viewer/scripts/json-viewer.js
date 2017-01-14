
$(function() {
  $('#json-input').bind('input propertychange', function() {
    RenderJSONView();
  });
  $('#json-url').bind('input propertychange', function() {
    $.getJSON( $('#json-url').val(), function( data ) {
      $('#json-input').val(JSON.stringify(data, null, 2));
      $('#json-input').hide()
      $('#json-renderer').css({'width': '100%'});
      RenderJSONView();
    })    
    .fail(function( jqxhr, textStatus, error ) {
      alert("Cannot fetch JSON from URL " + $('#json-url').val() + " - " + textStatus + ", " + error);
    });
  });
  // Display JSON sample on load
  RenderJSONView();
});


function RenderJSONView() {
  try {
    var input = eval('(' + $('#json-input').val() + ')');
  }
  catch (error) {
    return alert("Cannot eval JSON: " + error);
  }
  var options = {collapsed: false};
  $('#json-renderer').jsonViewer(input, options);
  $('#json-input').height( $('#json-renderer').height());
  $('body, html').animate({ scrollTop: 0 }, 800);
};