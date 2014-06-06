define(function( require , exports , module  ){
    require("./easyui/messager");
    function messager(){}
    messager.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/messager",function(messager){
            def.resolve(messager);
        });
        return def.promise();
    }
    module.exports = messager;
});