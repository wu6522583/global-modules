define(function( require , exports , module  ){
    require("./easyui/panel");
    function panel(){}
    panel.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/panel",function(panel){
            def.resolve(panel);
        });
        return def.promise();
    }
    module.exports = panel;
});