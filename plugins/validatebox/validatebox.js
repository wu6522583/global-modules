define(function( require , exports , module  ){
    require("./easyui/validatebox");
    function validatebox(){}
    validatebox.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/validatebox",function(validatebox){
            def.resolve(validatebox);
        });
        return def.promise();
    }
    module.exports = validatebox;
});