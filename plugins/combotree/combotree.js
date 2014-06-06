define(function( require , exports , module  ){
    require("./easyui/combotree");
    function combotree(){}
    combotree.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/combotree",function(combotree){
            def.resolve(combotree);
        });
        return def.promise();
    }
    module.exports = combotree;
});