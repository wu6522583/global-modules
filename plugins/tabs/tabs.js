define(function( require , exports , module  ){
    require("./easyui/tabs");
    function tabs(){}
    tabs.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/tabs",function(tabs){
            def.resolve(tabs);
        });
        return def.promise();
    }
    module.exports = tabs;
});