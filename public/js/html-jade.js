require.config({
  packages: [{
    name: "codemirror",
    location: "../vendor/codemirror",
    main: "lib/codemirror"
  }]
});

require([
  "codemirror/lib/codemirror",
  "codemirror/mode/htmlmixed/htmlmixed"
], function(CodeMirror) {
  CodeMirror.fromTextArea(document.getElementById("html"), {
    lineNumbers: true,
    mode: "htmlmixed"
  });
});
