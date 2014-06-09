define(function( require , exports , module  ){
    require("./Validform/Validform");
    function Validform(){}
    Validform.prototype.getValidform = function(){
        var def = $.Deferred();
        require.async("./Validform/Validform",function(Validform){
            def.resolve(Validform);
        });
        return def.promise();
    }
    module.exports = Validform;
});