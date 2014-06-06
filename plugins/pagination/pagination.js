define(function( require , exports , module  ){
    require("./easyui/pagination");
    function pagination(){}
    pagination.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/pagination",function(pagination){
            def.resolve(pagination);
        });
        return def.promise();
    }
    module.exports = pagination;
});