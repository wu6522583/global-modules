/**
 * 此模块用来扩展seajs 里面 不支持的功能。属于 seajs的外部扩展模块。
 * */
define(function(require,exports,module){
    var eax = 0;
    seajs.dependentLoad = function ( _arr , _callback ) {
        var args = arguments;
        seajs.use( args[0][eax] ,function(){
            if ( args[0][eax] ) {
                args.callee(args[0],args[1]);
            } else {
                args[1]();
            }
        });
        eax++;
    }
});