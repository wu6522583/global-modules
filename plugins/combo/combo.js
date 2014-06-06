define(function( require , exports , module  ){
    require("./easyui/combo");
    function combo(){}
    combo.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/combo",function(combo){
            def.resolve(combo);
        });
        return def.promise();
    }
    module.exports = combo;
});