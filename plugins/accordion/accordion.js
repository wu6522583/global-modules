define(function( require , exports , module ){
    /**
     * 默认 引入 easyui 的 accordion
     * */
    require("./easyui/accordion");
    function accordion(){}
    accordion.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/accordion",function(accordion){
            def.resolve(accordion);
        });
        return def.promise();
    }
    accordion.prototype.getBootStrop = function(){
        var def = $.Deferred();
        require.async("./bootstrop/accordionList",function(accordion){
            def.resolve(accordion);
        });
        return def.promise();
    }
    module.exports = accordion;
});