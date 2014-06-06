define(function( require , exports , module  ){
    require("./easyui/calendar");
    function calendar(){}
    calendar.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/calendar",function(calendar){
            def.resolve(calendar);
        });
        return def.promise();
    }
    module.exports = calendar;
});