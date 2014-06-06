define(function( require , exports , module  ){
    require("./easyui/menubutton");
    function menubutton(){}
    menubutton.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/menubutton",function(menubutton){
            def.resolve(menubutton);
        });
        return def.promise();
    }
    module.exports = menubutton;
});