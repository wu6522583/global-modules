define(function( require , exports , module  ){
    require("./easyui/propertygrid");
    function propertygrid(){}
    propertygrid.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/propertygrid",function(propertygrid){
            def.resolve(propertygrid);
        });
        return def.promise();
    }
    module.exports = propertygrid;
});