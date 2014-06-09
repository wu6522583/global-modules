define(function( require , exports , module  ){
//    require("./html5Upload/upload");
    function upload(){}
    upload.prototype.getHtml5Upload = function(){
        var def = $.Deferred();
        require.async("./html5Upload/upload",function(up){
            def.resolve(up);
        });
        return def.promise();
    }
    upload.prototype.getJQueryFileUpload = function () {
        var def = $.Deferred();
        require.async("./JQueryFileUpload/JQueryFileUpload",function(up){
            def.resolve(up);
        });
        return def.promise();
    }
    module.exports = upload;
});