define(function( require , exports , module  ){
    require("./easyui/draggable");
    function draggable(){}
    draggable.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/draggable",function(draggable){
            def.resolve(draggable);
        });
        return def.promise();
    }
    module.exports = draggable;
});