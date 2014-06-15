define(function( require , exports , module  ){
    function upload(){}
    upload.prototype.getHtml5Upload = function(){
        var def = $.Deferred();
        require.async("./html5Upload/upload",function(up){
            def.resolve(up);
        });
        return def.promise();
    }
    upload.prototype.getDropZone = function () {
        var def = $.Deferred();
        require.async("./dropzone/dropzone",function( dz ){
            var dropzone = new dz();
            dropzone.load().done(function(){
                def.resolve();
            });
        });
        return def.promise();
    }
    module.exports = upload;
});