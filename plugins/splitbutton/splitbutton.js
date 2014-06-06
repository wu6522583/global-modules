define(function( require , exports , module  ){
    require("./easyui/splitbutton");
    function splitbutton(){}
    splitbutton.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/splitbutton",function(splitbutton){
            def.resolve(splitbutton);
        });
        return def.promise();
    }
    module.exports = splitbutton;
});