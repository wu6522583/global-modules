define(function( require , exports , module  ){
    require("./easyui/datagrid");
    function datagrid(){}
    datagrid.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/datagrid",function(datagrid){
            def.resolve(datagrid);
        });
        return def.promise();
    }
    module.exports = datagrid;
});