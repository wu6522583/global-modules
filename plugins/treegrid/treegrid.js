define(function( require , exports , module  ){
    require("./easyui/treegrid");
    function treegrid(){}
    treegrid.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/treegrid",function(treegrid){
            def.resolve(treegrid);
        });
        return def.promise();
    }
    module.exports = treegrid;
});