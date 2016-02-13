require.config({
  packages: [{
    name: "codemirror",
    location: "../vendor/codemirror",
    main: "lib/codemirror"
  }]
});

var html, jade;

require([
  "codemirror/lib/codemirror",
  "codemirror/mode/htmlmixed/htmlmixed",
  "codemirror/mode/jade/jade"
], function(CodeMirror) {
  html = CodeMirror.fromTextArea(document.getElementById("html"), {
    lineNumbers: true,
    mode: "htmlmixed"
  });

  jade = CodeMirror.fromTextArea(document.getElementById("jade"), {
    lineNumbers: true,
    mode: "jade"
  });
});
