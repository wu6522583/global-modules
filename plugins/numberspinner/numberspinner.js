define(function( require , exports , module  ){
    require("./easyui/numberspinner");
    function numberspinner(){}
    numberspinner.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/numberspinner",function(numberspinner){
            def.resolve(numberspinner);
        });
        return def.promise();
    }
    module.exports = numberspinner;
});