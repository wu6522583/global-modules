define(function( require , exports , module  ){
    require("./easyui/tree");
    function tree(){}
    tree.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/tree",function(tree){
            def.resolve(tree);
        });
        return def.promise();
    }
    module.exports = tree;
});