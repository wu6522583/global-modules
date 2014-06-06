define(function( require , exports , module  ){
    require("./easyui/form");
    function form(){}
    form.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/form",function(form){
            def.resolve(form);
        });
        return def.promise();
    }
    module.exports = form;
});