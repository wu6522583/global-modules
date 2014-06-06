define(function( require , exports , module  ){
    require("./easyui/resizable");
    function resizable(){}
    resizable.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/resizable",function(resizable){
            def.resolve(resizable);
        });
        return def.promise();
    }
    module.exports = resizable;
});