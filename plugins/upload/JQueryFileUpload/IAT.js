define(function( require , exports , module ){
    /**
     * IAT 导入表,此模块负责导入 JQuery File UpLoad 相关的模块。
     * */
    var iattable = [
        "{globalPath}/upload/JQueryFileUpload/css/bootstrap.min.css",
        "{globalPath}/upload/JQueryFileUpload/css/style.css",
        "{globalPath}/upload/JQueryFileUpload/css/blueimp-gallery.min.css",
        "{globalPath}/upload/JQueryFileUpload/css/jquery.fileupload.css",
        "{globalPath}/upload/JQueryFileUpload/css/jquery.fileupload-ui.css",
        "{globalPath}/upload/JQueryFileUpload/js/jquery.min.js",
        "{globalPath}/upload/JQueryFileUpload/js/vendor/jquery.ui.widget.js",
        "{globalPath}/upload/JQueryFileUpload/js/tmpl.min.js",
        "{globalPath}/upload/JQueryFileUpload/js/load-image.min.js",
        "{globalPath}/upload/JQueryFileUpload/js/canvas-to-blob.min.js",
        "{globalPath}/upload/JQueryFileUpload/js/bootstrap.min.js",
        "{globalPath}/upload/JQueryFileUpload/js/jquery.blueimp-gallery.min.js",
        "{globalPath}/upload/JQueryFileUpload/js/jquery.iframe-transport.js",
        "{globalPath}/upload/JQueryFileUpload/js/jquery.fileupload.js",
        "{globalPath}/upload/JQueryFileUpload/js/jquery.fileupload-process.js",
        "{globalPath}/upload/JQueryFileUpload/js/jquery.fileupload-image.js",
        "{globalPath}/upload/JQueryFileUpload/js/jquery.fileupload-audio.js",
        "{globalPath}/upload/JQueryFileUpload/js/jquery.fileupload-video.js",
        "{globalPath}/upload/JQueryFileUpload/js/jquery.fileupload-validate.js",
        "{globalPath}/upload/JQueryFileUpload/js/jquery.fileupload-ui.js"];
    function IAT(){}
    IAT.prototype.load = function ( _callback ) {
        seajs.dependentLoad(iattable , _callback);
    }
    module.exports = IAT;
});