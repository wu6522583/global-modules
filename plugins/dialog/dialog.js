define(function( require , exports , module  ){
    require("./easyui/dialog");
    function dialog(){}
    dialog.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/dialog",function(dialog){
            def.resolve(dialog);
        });
        return def.promise();
    }
    module.exports = dialog;
});