define(function(require,exports,module){
    var upload = require("upload");
    upload = new upload();
    upload.getDropZone().done(function(){
        $("#myUpload").dropzone({url:"156.do"});
    });
});
