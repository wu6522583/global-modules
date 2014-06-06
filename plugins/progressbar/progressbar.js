define(function( require , exports , module  ){
    require("./easyui/progressbar");
    function progressbar(){}
    progressbar.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/progressbar",function(progressbar){
            def.resolve(progressbar);
        });
        return def.promise();
    }
    module.exports = progressbar;
});