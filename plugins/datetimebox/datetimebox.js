define(function( require , exports , module  ){
    require("./easyui/datetimebox");
    function datetimebox(){}
    datetimebox.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/datetimebox",function(datetimebox){
            def.resolve(datetimebox);
        });
        return def.promise();
    }
    module.exports = datetimebox;
});