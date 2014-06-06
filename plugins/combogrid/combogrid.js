define(function( require , exports , module  ){
    require("./easyui/combogrid");
    function combogrid(){}
    combogrid.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/combogrid",function(combogrid){
            def.resolve(combogrid);
        });
        return def.promise();
    }
    module.exports = combogrid;
});