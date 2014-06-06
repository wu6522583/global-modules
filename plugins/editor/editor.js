define(function(require,exports,module){
    function editor(){
        /*
        * 默认返回百度富文本编辑器
        * */
    }
    editor.prototype.getUeditor = function(){
        var def = $.Deferred();
        require.async("./ueditor/default",function(){
            require.async("./ueditor/IAT",function( iat ){
                var iat = new iat();
                iat.load(function(){
                    def.resolve();
                });
            });
        });
        return def.promise();
    }
    module.exports = editor;
});