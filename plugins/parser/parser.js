define(function( require , exports , module  ){
    require("./easyui/parser");
    function parser(){}
    parser.prototype.getEasyUI = function(){
        var def = $.Deferred();
        require.async("./easyui/parser",function(parser){
            def.resolve(parser);
        });
        return def.promise();
    }
    module.exports = parser;
});