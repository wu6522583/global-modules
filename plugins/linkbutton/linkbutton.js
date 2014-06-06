define(function( require , exports , module  ){
    require("./easyui/linkbutton");
    function linkbutton(){}
    linkbutton.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/linkbutton",function(linkbutton){
            def.resolve(linkbutton);
        });
        return def.promise();
    }
    module.exports = linkbutton;
});