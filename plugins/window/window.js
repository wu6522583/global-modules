define(function( require , exports , module  ){
    require("./easyui/window");
    function window(){}
    window.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/window",function(window){
            def.resolve(window);
        });
        return def.promise();
    }
    module.exports = window;
});