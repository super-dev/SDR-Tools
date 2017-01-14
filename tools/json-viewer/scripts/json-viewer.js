
$(function() {
  $('#json-input').bind('input propertychange', function() {
    RenderJSONView();
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