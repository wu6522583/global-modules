define(function( require , exports , module  ){
    require("./easyPS/photoshop");
    function photoshop(){}
    photoshop.prototype.getEasyPS = function(){
        var def = $.Deferred();
        require.async("./easyPS/photoshop",function(ps){
            def.resolve(ps);
        });
        return def.promise();
    }
    module.exports = photoshop;
});