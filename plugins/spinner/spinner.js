define(function( require , exports , module  ){
    require("./easyui/spinner");
    function spinner(){}
    spinner.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/spinner",function(spinner){
            def.resolve(spinner);
        });
        return def.promise();
    }
    module.exports = spinner;
});