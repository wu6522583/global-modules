define(function( require , exports , module  ){
    require("./easyui/numberbox");
    function numberbox(){}
    numberbox.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/numberbox",function(numberbox){
            def.resolve(numberbox);
        });
        return def.promise();
    }
    module.exports = numberbox;
});