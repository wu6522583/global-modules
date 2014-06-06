define(function( require , exports , module  ){
    require("./easyui/datePicker");
    function datePicker(){}
    datePicker.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/datePicker",function(datePicker){
            def.resolve(datePicker);
        });
        return def.promise();
    }
    datePicker.prototype.getMy97DatePicker = function(){
        var def = $.Deferred();
        seajs.dependentLoad(["{globalPath}/datePicker/My97DatePicker/WdatePicker","{globalPath}/datePicker/My97DatePicker/calendar"],function(){
            def.resolve();
        })
//        require.async(["./My97DatePicker/WdatePicker","./My97DatePicker/calendar"],function(a,b){
//            def.resolve(a,b);
//        });
        return def.promise();
    }
    module.exports = datePicker;
});