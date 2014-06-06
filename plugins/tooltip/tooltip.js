define(function( require , exports , module  ){
    require("./easyui/tooltip");
    function tooltip(){}
    tooltip.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/tooltip",function(tooltip){
            def.resolve(tooltip);
        });
        return def.promise();
    }
    module.exports = tooltip;
});