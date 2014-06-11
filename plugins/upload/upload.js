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
        require.async("./JQueryFileUpload/IAT",function( iat ){
            var iat = new iat();
            iat.load(function(){
                require.async("./JQueryFileUpload/JQueryFileUpLoad",function(  ){
                    def.resolve();
                });
            });
        });
        return def.promise();
    }
    module.exports = upload;
});