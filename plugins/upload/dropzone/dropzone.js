define(function(require , exports , module){
    require("./dropzone/css/basic.css");
    require("./dropzone/css/dropzone.css");
    function dropzone(){}
    dropzone.prototype.load = function(){
        var def = $.Deferred();
        require.async("./dropzone/dropzone",function(){
            def.resolve();
        });
        return def.promise();
    }
    module.exports = dropzone;
});
// dropzone 参数demo
//$("#myUpload").dropzone({
//    paramName: "file", // The name that will be used to transfer the file
//    maxFilesize: 2, // MB
//    url:"156",
//    method:"post", /* post 或者 get */
//    parallelUploads:1,/*并行上传数*/
//    addRemoveLinks:true,
//    clickable:true,
//    autoProcessQueue:true,
//    forceFallback:false,
//    dictFallbackMessage:"你想填写什么呢！",
//    dictFallbackText:"这里也可以自定义！",
//    dictFileTooBig:"太大了",
//    dictResponseError:"返回失败",
//    dictRemoveFile:"取消上传",
//    accept: function(file, done) {
//        if (file.name == "justinbieber.jpg") {
//            done("Naha, you don't.");
//        }
//        else {
//            done();
//        }
//    },
//    init: function() {
//        this.on("addedfile", function(file) { alert("Added file."); });
//        this.on("drop", function(file) { alert("drop file."); });
//        this.on("dragstart", function(file) { alert("dragstart file."); });
//        this.on("dragend", function(file) { alert("dragend file."); });
//        this.on("dragenter", function(file) { alert("dragenter file."); });
//        this.on("dragover", function(file) { alert("dragover file."); });
//        this.on("dragleave", function(file) { alert("dragleave file."); });
//        this.on("removedfile", function(file) { alert("removedfile file."); });
//        this.on("thumbnail", function(file) { alert("thumbnail file."); });
//        this.on("error", function(file) { alert("error file."); });
//        this.on("processing", function(file) { alert("processing file."); });
//        this.on("uploadprogress", function(file) { alert("uploadprogress file."); });
//        this.on("sending", function(file) { alert("sending file."); });
//        this.on("success", function(file) { alert("success file."); });
//        this.on("complete", function(file) { alert("complete file."); });
//        this.on("canceled", function(file) { alert("canceled file."); });
//        this.on("maxfilesreached", function(file) { alert("maxfilesreached file."); });
//        this.on("maxfilesexceeded", function(file) { alert("maxfilesexceeded file."); });
//        this.on("processingmultiple", function(file) { alert("processingmultiple file."); });
//        this.on("sendingmultiple", function(file) { alert("sendingmultiple file."); });
//        this.on("successmultiple", function(file) { alert("successmultiple file."); });
//        this.on("completemultiple", function(file) { alert("completemultiple file."); });
//        this.on("canceledmultiple", function(file) { alert("canceledmultiple file."); });
//        this.on("totaluploadprogress", function(file) { alert("totaluploadprogress file."); });
//        this.on("reset", function(file) { alert("reset file."); });
//        this.on("queuecomplete", function(file) { alert("queuecomplete file."); });
//        this.on("maxfilesexceeded", function(file) { alert("maxfilesexceeded file."); });
//    }
//});
