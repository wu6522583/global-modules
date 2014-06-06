define(function( require , exports , module  ){
    require("./easyui/timespinner");
    function timespinner(){}
    timespinner.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/timespinner",function(timespinner){
            def.resolve(timespinner);
        });
        return def.promise();
    }
    module.exports = timespinner;
});