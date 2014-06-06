define(function( require , exports , module  ){
    require("./easyui/datebox");
    function datebox(){}
    datebox.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/datebox",function(datebox){
            def.resolve(datebox);
        });
        return def.promise();
    }
    module.exports = datebox;
});