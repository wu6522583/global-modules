define(function( require , exports , module  ){
    require("./easyui/droppable");
    function droppable(){}
    droppable.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/droppable",function(droppable){
            def.resolve(droppable);
        });
        return def.promise();
    }
    module.exports = droppable;
});