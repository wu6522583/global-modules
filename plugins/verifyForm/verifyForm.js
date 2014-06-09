define(function( require , exports , module  ){
    require("./verifyForm/verifyForm");
    function verifyForm(){}
    verifyForm.prototype.getVerifyForm = function(){
        var def = $.Deferred();
        require.async("./verifyForm/verifyForm",function(verifyForm){
            def.resolve(verifyForm);
        });
        return def.promise();
    }
    module.exports = verifyForm;
});