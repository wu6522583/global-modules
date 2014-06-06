define(function( require , exports , module  ){
    require("./easyui/searchbox");
    function searchbox(){}
    searchbox.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/searchbox",function(searchbox){
            def.resolve(searchbox);
        });
        return def.promise();
    }
    module.exports = searchbox;
});