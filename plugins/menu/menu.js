define(function( require , exports , module  ){
    require("./easyui/menu");
    function menu(){}
    menu.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/menu",function(menu){
            def.resolve(menu);
        });
        return def.promise();
    }
    module.exports = menu;
});