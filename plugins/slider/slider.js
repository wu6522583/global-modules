define(function( require , exports , module  ){
    require("./easyui/slider");
    function slider(){}
    slider.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/slider",function(slider){
            def.resolve(slider);
        });
        return def.promise();
    }
    module.exports = slider;
});