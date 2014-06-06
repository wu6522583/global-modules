define(function( require , exports , module  ){
    require("./easyui/layout");
    function layout(){}
    layout.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/layout",function(layout){
            def.resolve(layout);
        });
        return def.promise();
    }
    module.exports = layout;
});