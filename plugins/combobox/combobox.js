define(function( require , exports , module  ){
    require("./easyui/combobox");
    function combobox(){}
    combobox.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/combobox",function(combobox){
            def.resolve(combobox);
        });
        return def.promise();
    }
    module.exports = combobox;
});