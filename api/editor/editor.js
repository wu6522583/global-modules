define(function(require , exports , module){
    var editor = require("editor");
    editor = new editor();
    editor.getUeditor().done(function(){
        UE.getEditor('myEditor');
    });
});